import { voiceMessage } from '../../../types/command'
import { botData } from '../../../types/command'

module.exports = {
  name: 'play',
  description: 'Reproduce musica',
  execute (args: Array<string>,  botData: botData): Promise<void> {
    const song = args.join(' ')
    console.log('Playing:', song)
    return new Promise( async (resolve, reject) => {
      try {  
        await botData.disTube.play(botData.message, song)
        resolve()
      } catch(e) {
        reject(e)
        console.log('[VoiceChannel.play] - Error en play...')
      }
    })
  }
}