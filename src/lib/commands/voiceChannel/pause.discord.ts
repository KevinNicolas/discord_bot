import Discord from 'discord.js'
import DisTube from 'distube'

module.exports = {
  name: 'pause',
  description: 'Pause la musica que se encuentra en reproducción',
  execute (distube: DisTube, message: Discord.Message): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        distube.pause(message)
        resolve()
      } catch(e) {
        reject(e)
        console.log('[VoiceChannel.pause] - Error en pause...')
      }
    })
  }
}