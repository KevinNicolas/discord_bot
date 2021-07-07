import { voiceMessage } from '../../../types/command'

module.exports = {
  name: 'play',
  description: 'Reproduce musica',
  execute (song: string, voiceMessage: voiceMessage): Promise<void> {
    console.log('Playing:', song)
    return new Promise( async (resolve, reject) => {
      try {  
        await voiceMessage.disTube.play(voiceMessage.message, song)
        resolve()
      } catch(e) {
        reject(e)
        console.log('[VoiceChannel.play] - Error en play...')
      }
    })
  }
}