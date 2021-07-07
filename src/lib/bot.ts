import Discord from 'discord.js'
import Commands from './commands/index'
import DisTube from 'distube'

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
    this.commands = new Discord.Collection()
    const commandFiles: Array<string> = Fs.readdirSync(path.resolve(__dirname, './commands/voiceChannel')).filter(file => file.endsWith('.discord.ts'))
    console.log('Comensando for', commandFiles)
    for(let file of commandFiles) {
      const command = require(`./commands/voiceChannel/${file}`)
      this.commands.set(command.name.replace('.discord.ts'), command)
      console.log('Command name:', command.name)
    }
  }

  //TODO: Crear una type general con todo lo necesario para que todos los modulos funcionen

  public run(message: Discord.Message): Promise<void> {
    return new Promise ( async (resolve, reject) => {
      try {
        const args: Array<string> = await this._toArguments(message.content)
        switch(args[0]) {
          // case 'join': this.voiceConnection = await Commands.voiceChannel.join(message); break;
          case 'join': this.voiceConnection = await this.commands.get(args[0]).execute(message); break
          case 'leave': 
            this.voiceConnection && await Commands.voiceChannel.leave({
              client: this.client,
              disTube: this.distube,
              message: message,
              voiceConnection: this.voiceConnection
            }); 
          break;
          case 'play': 
            this.voiceConnection && await Commands.voiceChannel.play(
              args.splice(1).join(' '),
              {
                client: this.client,
                disTube: this.distube,
                message: message,
                voiceConnection: this.voiceConnection
              }
            );
          break;
          case 'pause': await Commands.voiceChannel.pause(this.distube, message); break
          case 'resume': await Commands.voiceChannel.resume(this.distube, message); break
          case 'stop': await Commands.voiceChannel.stop(this.distube, message); break
          case 'next': await Commands.voiceChannel.next(this.distube, message, Number(args.splice(1))); break
          case 'ping': message.channel.send(`Pong!!! ${message.guild?.name}`); break
        }
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
}