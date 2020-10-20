require('dotenv').config()
var needle = require('needle')

const Wiki = (query) => new Promise((resolve, reject) => {
    var url = 'https://api.i-tech.id'
    var key = process.env.key
    needle(url + '/tools/wiki?key=' + key + '&query=' + query, async (err, resp, body) => {
        try {
            if (body.status !== 'error') {
                resolve(body.result)
            } else {
                reject(`Query *${query}* tidak ditemukan.`)
            }
        } catch (err) {
            reject(err)
        }
    })
})

module.exports = Wiki