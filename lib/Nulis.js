const needle = require('needle')
const _ = require('lodash')

const Nulis = (text) => new Promise((resolve, reject) => {
    let url = 'http://salism3.pythonanywhere.com/write?text='
    if (typeof text === 'undefined') { reject('masukan text nya kak.') }
    if (text.indexOf('#') > -1) { text.replace(/\#/g, '')}

    needle(url + text, (err, resp, body) => {
        if (_.isEmpty(body) === true) { reject('sepertinya error kak.') }
        if (_.isEmpty(body.images) === true) { reject('tidak dapat memuat gambar, coba lagi.') }

        resolve(
            body.images
        )
    })
})

module.exports = Nulis