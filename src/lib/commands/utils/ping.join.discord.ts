import Discord from 'discord.js'
import { botData } from '~/types/command'

module.exports = {
  name: 'ping',
  description: 'Devuelve un mensaje predefinido',
  execute (args: Array<string>,  botData: botData): Promise<void> {
    return new Promise (async (resolve, reject) => {
      botData.message.channel.send(`Pong!! ${botData.message.author}`)
    })
  }
}