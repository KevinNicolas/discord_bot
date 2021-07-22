import Discord from 'discord.js'
import DisTube from 'distube'
import { botData } from '../types/command'
import IBot from './IBot'

import Fs from 'fs'
import path from 'path'


export default class Bot implements IBot {

  private client: Discord.Client
  private distube: DisTube
  private voiceConnection?: Discord.VoiceConnection
  private commands: Discord.Collection<any, any>
  private message?: Discord.Message

  public constructor(cliente: Discord.Client) {

    this.client = cliente

    this.distube = new DisTube(this.client, {
      emitNewSongOnly: true,
      leaveOnEmpty: false,
      leaveOnFinish: false,
    })
    this.commands = this._mountCommands();
  }

  public run(message: Discord.Message): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const args: Array<string> = await this._toArguments(message.content)
<<<<<<< HEAD
        if (args[0].toLowerCase() !== 'init') await this._runCommand(message, args)
=======
        if(args[0].toLowerCase() !== 'init') await this._runCommand(message, args)
>>>>>>> a70ecfb370a9b799496b168f54df89a8f9403275
        else this.message = message
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }

  private _toArguments(message: string): Promise<Array<string>> {
    return new Promise(async (resolve, reject) => {
      try {
        const args = message.slice(process.env.PREFIX?.length || 2).trim().split(/ +/);
        console.log('Argumentos:', args)
        resolve(args)
      } catch (e) {
        reject(e)
        console.log('[X] - Error en _toArguments...')
      }
    })
  }

  private _runCommand(message: Discord.Message, args: Array<string>): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const isCommonCommand: Boolean = this.commands.has(args[0])
        const isWebhookCommand: Boolean = args[0].toLowerCase() === 'webhook' && this.commands.has(args[1])
        if (isCommonCommand || (isWebhookCommand && this.message)) {
          const botData: botData = {
            client: this.client,
            message: isCommonCommand ? message : this.message || message,
            disTube: this.distube,
            voiceConnection: this.voiceConnection
          }
          if (isWebhookCommand) args = args.slice(1)
          const returnData = await this.commands.get(args[0]).execute(args.splice(1), botData)

          if (args[0].toLowerCase() === 'join') { this.voiceConnection = returnData; }

          resolve()
        } else {
          if (isWebhookCommand && !this.message) message.channel.send('No es posible utilizar webhook...')
          else {
            console.log('Comando deconocido...')
            message.channel.send('Comando desconocido...')
          }
        }
      } catch (e) {
        reject(e)
        console.log('[Bot._runCommand] - Error')
      }
    })
  }

  private _mountCommands(): Discord.Collection<any, any> {
    this.commands = new Discord.Collection()

    const commandFolders: Array<string> = Fs.readdirSync(
      path.resolve(__dirname, './commands/')
    )

    console.log()
    for (let folder of commandFolders) {
      console.log(`Carpeta ${folder}`)
      const commandFiles: Array<string> = Fs.readdirSync(
        path.resolve(__dirname, `./commands/${folder}`)).filter(file => file.endsWith('.discord.ts'))
      for (let file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`)
        this.commands.set(command.name.replace('.discord.ts'), command)
        console.log(`| Comando '${file}' implementado`)
      }
    }
    return this.commands
  }

  public getClient(): Discord.Client {
    return this.client
  }
}