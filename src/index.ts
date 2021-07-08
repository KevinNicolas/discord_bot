import Discord from 'discord.js'
import Bot from './lib/bot'
import dotev from 'dotenv'

dotev.config()

const client: Discord.Client = new Discord.Client()

client.once('ready', () => {
  console.log('Ready!')
  // const channel101: any = client.channels.cache.find(channel => channel.id === '862138521018826782')
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