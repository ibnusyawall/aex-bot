require('dotenv').config()
var needle = require('needle')


const Cuaca = (kota) => new Promise((resolve, reject) => {
    if (typeof kota === 'undefined') reject('Harap masukan nama kota.')

    let url = 'https://api.i-tech.id'
    let key = process.env.key

    needle(url + '/tools/cuaca?key=' + key + '&kota=' + kota, async (err, rssp, body) => {
        try {
            if (body.cuaca == null) {
                reject(`Nama kota *${kota}* tidak ditemukan.`)
            } else {
                resolve(body)
            }
        } catch (ere) {
            reject(err)
        }
    })
})

module.exports = Cuaca
