var ttsId = require('node-gtts')('id')
var ttsEn = require('node-gtts')('en')
var { GetBase64 } = require('./GetBase64')

const Gtts = (options, text) => new Promise((resolve, reject) => {
  try {
    switch (options) {
      case 'id':
        let pathID = process.cwd() + '/ttsID.mp3'
        ttsId.save(pathID, text, () => {
          console.log('ok tts [id]')
          GetBase64(pathID)
            .then(data => {
              resolve(data)
            })
        })
        break;
      case 'en':
        let pathEN = process.cwd() + '/ttsEN.mp3'
        ttsEn.save(pathEN, text, () => {
          console.log('ok tts [en]')
          GetBase64(pathEN)
            .then(data => {
              resolve(data)
            })
        })
        break;
      default:
        console.log('piilih bahasa: \n\n*id* untuk bahasa indonesia \n*en* untuk bahasa inggris')
        break;
    }
  } catch (err) {
    reject(err)
  }
})

module.exports = Gtts
