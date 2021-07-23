import { botData } from '~/types/command'

module.exports = {
  name: 'fade',
  description: 'Crea un fade de entrada/salida',
  execute(args: Array<string>, botData: botData): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        let diferenciaDeVolumen = 10;
        let volumenActual = 0;

        if (args[0] === 'out') {
          diferenciaDeVolumen = -10
          volumenActual = 100
        }

        botData.disTube.setVolume(botData.message, volumenActual)

        const tiempoDeFade = (Number(args[1] || 3) * 1000) / 10
        const sleep = (tiempoDeEspera: number): Promise<void> => {
          return new Promise(resolve => {
            setTimeout(() => resolve(), tiempoDeEspera)
          })
        }

        console.log('Tiempo de fade /10', tiempoDeFade)

        for (let i = 0; i < 10; i++) {
          await sleep(tiempoDeFade)
          volumenActual += diferenciaDeVolumen
          botData.disTube.setVolume(botData.message, volumenActual)
        }
      } catch (e) {
        reject(e)
        console.log('[VoiceChannel.vplume] - Error en volume...')
      }
    })
  }
}