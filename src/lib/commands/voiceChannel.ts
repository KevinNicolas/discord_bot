import Discord from 'discord.js'
import DisTube from 'distube'
import { voiceMessage } from '../../types/command'

export function join (message: Discord.Message):Promise<Discord.VoiceConnection | undefined> {
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

export function leave (voiceMessage: voiceMessage): Promise<void> {
  return new Promise (async (resolve, reject) => {
    try {
      voiceMessage.voiceConnection.disconnect()
      resolve()
    } catch (e) {
      reject(e)
      console.log('[VoiceChannel.Leave] - Error inesperado')
    }
  })
}

export function play (song: string, voiceMessage: voiceMessage): Promise<void> {
  console.log('Playing:', song)
  return new Promise( async (resolve, reject) => {
    try {  
      await voiceMessage.disTube.play(voiceMessage.message, song)
      resolve()
    } catch(e) {
      reject(e)
      console.log('[VoiceChannel.play] - Error en play...')
    }
  })
}

export function pause(distube: DisTube, message: Discord.Message): Promise<void> {
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

export function resume(distube: DisTube, message: Discord.Message): Promise<void> {
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

export function stop(distube: DisTube, message: Discord.Message): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      distube.stop(message)
    } catch (e) {
      reject(e)
      console.log('[VoiceChannel.stop] - Error en stop...')
    }
  })
}

export function next(distube: DisTube, message: Discord.Message, cant: number = 1): Promise<void> {
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