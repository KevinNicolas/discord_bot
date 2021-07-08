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
  
  public constructor(cliente: Discord.Client) { 
    
    this.client = cliente
    
    this.distube = new DisTube(this.client, {
      emitNewSongOnly: true,
      leaveOnEmpty: false,
      leaveOnFinish: false,
    })

    this.commands = this._getCommands();
  }

  public run(message: Discord.Message): Promise<void> {
    return new Promise ( async (resolve, reject) => {
      try {
        const args: Array<string> = await this._toArguments(message.content)
        switch(args[0]) {
          case 'ping': message.channel.send(`Pong!!! ${message.guild?.name}`); break
          default: {
            const botData: botData = {
              client: this.client,
              message: message,
              disTube: this.distube,
              voiceConnection: this.voiceConnection
            }
            const returnData = await this.commands.get(args[0]).execute(args.splice(1), botData)
            if (typeof(returnData) === typeof(Discord.VoiceConnection)) this.voiceConnection = returnData
          }
        }
        resolve()
      } catch (e) {
        reject(e)
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

  private _getCommands(): Discord.Collection<any, any> {
    this.commands = new Discord.Collection()

    const commandFiles: Array<string> = Fs.readdirSync(
      path.resolve(__dirname, './commands/voiceChannel')).filter(file => file.endsWith('.discord.ts')
    )
    
    for(let file of commandFiles) {
      const command = require(`./commands/voiceChannel/${file}`)
      this.commands.set(command.name.replace('.discord.ts'), command)
      console.log('Comando', command.name.toString(), 'implementado')
    }
    return this.commands
  }
}