import Discord from 'discord.js'

module.exports = {
  name: 'join',
  description: 'Ingresar a un canal de voz',
  execute(message: Discord.Message): Promise<Discord.VoiceConnection | undefined> {
    return new Promise( async (resolve, reject) => {
      try {
        let voiceConnection: Discord.VoiceConnection | undefined
        if(message.member)
            if (message.member.voice.channel)
              voiceConnection = await message.member.voice.channel.join()
            else {
              console.log('[VoiceChannel.Join] - Canal no encontrado')
              message.channel.send('No se ha encontrado el canal')
            }
        else {
          console.log('[VoiceChannel.Join] - Usuario no encontrado')
          message.channel.send('No te encuentras en un canal de voz')
        }
        resolve(voiceConnection)
      }
      catch (e) {
        reject(e)
        console.log('[VoiceChannel.Join] - Error inesperado')
      }
    })
  }
}