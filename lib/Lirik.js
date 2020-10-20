require('dotenv').config()
var needle = require('needle')

const Lirik = (query) => new Promise((resolve, reject) => {
    var url = 'https://api.i-tech.id'
    var key = process.env.key

    needle(url + '/tools/lirik?key=' + key + '&query=' + query.replace(/ +/g, '+'), async (err, resp, body) => {
        try {
            if (body.status !== 'error') {
                resolve(body.result)
            } else {
                reject(`Lirik *${query}* tidak ditemukan.`)
            }
        } catch (err) {
            reject(err)
        }
    })
})

module.exports = Lirik