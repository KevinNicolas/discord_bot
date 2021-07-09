import Discord from 'discord.js'
import { botData } from '~/types/command'

module.exports = {
  name: 'play',
  description: 'Reproduce musica',
  execute (args: Array<string>,  botData: botData): Promise<void> {
    const song = args.join(' ')
    console.log('Playing:', song)
    return new Promise( async (resolve, reject) => {
      try {  
        await botData.disTube.play(botData.message, song)
        const queue: any = botData.disTube.getQueue(botData.message).songs[0]
        await botData.message.channel.send(`
          > Reproduciendo: ${queue.name} || ${queue.url}  ${queue.formattedDuration}
        
        `)
        console.log(queue)
        resolve()
      } catch(e) {
        reject(e)
        console.log('[VoiceChannel.play] - Error en play...')
      }
    })
  }
}