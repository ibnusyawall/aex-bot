var translate = require('@vitalets/google-translate-api')

const Translate = (text, to) => new Promise((resolve, reject) => {
    translate(text, {to: to})
        .then(data => {
             resolve(data.text)
        })
        .catch(err => {
            reject(err)
        })
})

module.exports = Translate