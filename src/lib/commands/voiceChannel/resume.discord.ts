import Discord from 'discord.js'
import DisTube from 'distube'

module.exports = {
  name: 'resume',
  description: 'Reanuda la reproducción de musica',
  execute (distube: DisTube, message: Discord.Message): Promise<void> {
    return new Promise((resolve, reject) => {
      try { 
        distube.resume(message)
        resolve()
      } catch (e) {
        reject(e)
        console.log('[VoiceChannel.resume] - Error en resume...')
      }
    })
  }
}