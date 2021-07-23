import { botData } from '~/types/command'

module.exports = {
  name: 'pause',
  description: 'Pause la musica que se encuentra en reproducción',
  execute(args: Array<string>, botData: botData): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        botData.disTube.pause(botData.message)
        resolve()
      } catch (e) {
        reject(e)
        console.log('[VoiceChannel.pause] - Error en pause...')
      }
    })
  }
}