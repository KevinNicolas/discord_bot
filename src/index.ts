import Discord from 'discord.js'
import Bot from './lib/bot'
import dotev from 'dotenv'
// import { commandMessage } from './types/command'

dotev.config()

const client = new Discord.Client()

client.once('ready', () => {
  console.log('Ready!')
})


const bot = new Bot(client)

client.on('message', async message => {
  if (message.content.startsWith(process.env.PREFIX || '!!')) {
    bot.run(message)
  }
})

process.env.TOKEN
  ? client.login(process.env.TOKEN)
  : console.log('[X] - No se ha ingresado un token')