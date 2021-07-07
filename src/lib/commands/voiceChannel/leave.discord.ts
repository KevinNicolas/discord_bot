import Discord from 'discord.js'
import { voiceMessage } from '../../../types/command'

module.exports = {
  name: 'leave',
  description: 'Abandona el canal de voz en el que se encuentra',
  execute (voiceMessage: voiceMessage): Promise<void> {
    return new Promise (async (resolve, reject) => {
      try {
        voiceMessage.voiceConnection.disconnect()
        resolve()
      } catch (e) {
        reject(e)
        console.log('[VoiceChannel.Leave] - Error inesperado')
      }
    })
  }
}