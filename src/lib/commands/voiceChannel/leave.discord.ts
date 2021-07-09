import Discord from 'discord.js'
import { botData } from '../../../types/command'

module.exports = {
  name: 'leave',
  description: 'Abandona el canal de voz en el que se encuentra',
  execute (args: Array<string>,  botData: botData): Promise<void> {
    return new Promise (async (resolve, reject) => {
      try {
        if (botData.voiceConnection) botData.voiceConnection.disconnect()
        else console.log('[VoiceChannel.Leave] - Sin voice connection...')
        resolve()
      } catch (e) {
        reject(e)
        console.log('[VoiceChannel.Leave] - Error inesperado')
      }
    })
  }
}