import Discord from 'discord.js'
import DisTube from 'distube'

module.exports = {
  name: 'stop',
  description: 'Detiene la reproducción de musica y hace que el bot salga del canal de voz',
  execute (distube: DisTube, message: Discord.Message): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        distube.stop(message)
      } catch (e) {
        reject(e)
        console.log('[VoiceChannel.stop] - Error en stop...')
      }
    })
  }
}