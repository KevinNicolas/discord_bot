import Discord from 'discord.js'
import { botData } from '~/types/command'

module.exports = {
  name: 'autoplay',
  description: 'Establece la autoreproduccion de musica',
  execute (args: Array<string>,  botData: botData): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const mode = botData.disTube.toggleAutoplay(botData.message)
        botData.message.channel.send(`Autoplay: ${mode}`)
        resolve()
      } catch (e) {
        reject(e)
        console.log('Error en establece autoplay')
      }
    })
  }
}