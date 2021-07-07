import Discord from 'discord.js'
import DisTube from 'distube'

module.exports = {
  name: 'next',
  description: 'Avanza n veces en la lista de reproduccion',
  execute (distube: DisTube, message: Discord.Message, cant: number = 1): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        distube.jump(message, cant > 0 ? cant : 1)
        resolve()
      } catch (e) {
        reject(e)
        console.log('[VoiceChannel.next] - Error en next...')
      }
    })
  }
}