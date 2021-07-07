import Discord from 'discord.js'
import DisTube from 'distube'

export type message = {
  client: Discord.Client,
  message: Discord.Message
}

export type voiceMessage = message & {
  voiceConnection: Discord.VoiceConnection
  disTube: DisTube
}