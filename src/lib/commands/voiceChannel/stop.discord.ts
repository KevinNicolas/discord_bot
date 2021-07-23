import { botData } from '~/types/command'

module.exports = {
  name: 'stop',
  description: 'Detiene la reproducción de musica y hace que el bot salga del canal de voz',
  execute(args: Array<string>, botData: botData): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        botData.disTube.stop(botData.message)
      } catch (e) {
        reject(e)
        console.log('[VoiceChannel.stop] - Error en stop...')
      }
    })
  }
}