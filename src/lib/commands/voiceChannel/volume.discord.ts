import { botData } from '~/types/command'

module.exports = {
  name: 'volume',
  description: 'Establece el volumen de la musica',
  execute(args: Array<string>, botData: botData): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        botData.disTube.setVolume(botData.message, Number(args[0]))
      } catch (e) {
        reject(e)
        console.log('[VoiceChannel.vplume] - Error en volume...')
      }
    })
  }
}