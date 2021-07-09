import amqp from 'amqplib'
import Bot from '../bot'
import Discord from 'discord.js'

export default abstract class Queue {

  private channel:amqp.Channel | any
  private channelName: string | any

  private constructor() {}

  public createChannel(channelName: string):Promise<void> {
    console.log('[D] - Creando canal')
    return new Promise(async (resolve, reject) => {
      try {
        const connection:amqp.Connection = await amqp.connect('amqp://localhost')
        const channel:amqp.Channel = await connection.createChannel()
        await channel.assertQueue(channelName)

        this.channel = channel
        console.log('[D] - Canal creado')
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }

  public start(bot: Bot): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        this.channel.consume(this.channelName, async (message: any) => {
          const mensaje = message.toString()
          // TODO: Terminar de hacer esto
        })
        resolve()
      } catch (e) {
        reject(e)
        console.log('[Consumer.start] - Error')
      }
    })
  }
}