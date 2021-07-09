import Discord from 'discord.js'
import DisTube from 'distube'
import { botData } from '../types/command'

import Fs from 'fs'
import path from 'path'


export default class Bot {
  
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
    return new Promise ( async (resolve, reject) => {
      try {
        const args: Array<string> = await this._toArguments(message.content)
        switch(args[0]) {
          case 'ping': message.channel.send(`Pong!!! ${message.guild?.name}`); break
          case 'webhook': {
            if (this.commands.has(args[1]) && this.message) {
              await this._runCommand(this.message, args.splice(1))
            } else {
              if (args[1] === 'init') this.message = message
              else console.log('Comando deconocido...')
            }
          }break
          default: {
            if (this.commands.has(args[0]))
              await this._runCommand(message, args)
            else {
              console.log('Comando deconocido...')
              message.channel.send('Comando desconocido...')
            }
              
          }
        }
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }

  public runRabbitCommand(message: Discord.Message): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(message)
        resolve()
      } catch (e) {
        reject(e)
        console.log('[Bot.runRabbitCommand] - Error...')
      }
    })
  }

  private _toArguments(message: string): Promise<Array<string>> {
    return new Promise (async (resolve, reject) => {
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
        const botData: botData = {
          client: this.client,
          message: message,
          disTube: this.distube,
          voiceConnection: this.voiceConnection
        }
        const returnData = await this.commands.get(args[0]).execute(args.splice(1), botData)
        if (args[0].toLowerCase() === 'join') {this.voiceConnection = returnData; console.log('Save info')}
        resolve()
      } catch (e) {
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
    for(let folder of commandFolders) {
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