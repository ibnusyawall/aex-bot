var qrcode = require('qrcode')

const QrMaker = (text) => new Promise((resolve, reject) => {
  run().catch(error => console.error(error.stack))

  async function run() {
    const res = await qrcode.toDataURL(text, {
      errorCorrectionLevel: 'H'
    })

    resolve(res)
  }
})

module.exports = QrMaker
