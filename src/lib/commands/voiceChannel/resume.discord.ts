import { botData } from '~/types/command'

module.exports = {
  name: 'resume',
  description: 'Reanuda la reproducción de musica',
  execute(args: Array<string>, botData: botData): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        botData.disTube.resume(botData.message)
        resolve()
      } catch (e) {
        reject(e)
        console.log('[VoiceChannel.resume] - Error en resume...')
      }
    })
  }
}