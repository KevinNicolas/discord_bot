import Discord from 'discord.js'
import { botData } from '../../../types/command'

module.exports = {
  name: 'next',
  description: 'Avanza n veces en la lista de reproduccion',
  execute (args: Array<string>,  botData: botData): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        let cant = 1
        try { cant = Number(args.join() || 1) } catch (e) {}
        botData.disTube.jump(botData.message, cant > 0 ? cant : 1)
        resolve()
      } catch (e) {
        reject(e)
        console.log('[VoiceChannel.next] - Error en next...')
      }
    })
  }
}