var translate = require('@vitalets/google-translate-api')

/**
 * Automate detect language to Translate
 * @param {String} text
 * @param {String} to
 * @returns {String}
 */

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
//Translate('Helo mi name is ibnu', 'id').then(d => console.log(d)).catch(err => console.log(err))
