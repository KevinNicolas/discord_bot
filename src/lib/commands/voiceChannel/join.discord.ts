import Discord from 'discord.js'
import { botData } from '~/types/command'

module.exports = {
  name: 'join',
  description: 'Ingresar a un canal de voz',
  execute(args: Array<string>,  botData: botData): Promise<Discord.VoiceConnection | undefined> {
    return new Promise( async (resolve, reject) => {
      try {
        let voiceConnection: Discord.VoiceConnection | undefined
        if(botData.message.member)
            if (botData.message.member.voice.channel)
              voiceConnection = await botData.message.member.voice.channel.join()
            else {
              console.log('[VoiceChannel.Join] - Canal no encontrado')
              botData.message.channel.send('No se ha encontrado el canal')
            }
        else {
          console.log('[VoiceChannel.Join] - Usuario no encontrado')
          botData.message.channel.send('No te encuentras en un canal de voz')
        }
        resolve(voiceConnection)
      }
      catch (e) {
        reject(e)
        console.log('[VoiceChannel.Join] - Error inesperado')
      }
    })
  }
}