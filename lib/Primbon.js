require('dotenv').config()
var needle = require('needle')

const Primbon = (type, text) => new Promise((resolve, reject) => {
    var url = 'https://api.i-tech.id/tools/'
    var key = process.env.key

    switch (type) {
        case 'artinama':
            needle(url + 'arti?key=' + key + '&nama=' + text.replace(/ +/g, '+'), async (err, resp, body) => {
                try {
                    if (body.status !== 'error') {
                        const { arti } = body
                        resolve(arti)
                    }
                } catch (err) {
                    reject(err)
                }
            })
            break
        case 'cekjodoh':
            var couple = text.split(/\W/g).filter(i => i.trim() != '')
            needle(url + 'jodoh?key=' + key + '&p1=' + couple[0] + '&p2=' + couple[1], async (err, resp, body) => {
                try {
                    if (body.status !== 'error') {
                        const { positif, negatif } = body.sisi
                        resolve(`Cek jodoh *${couple[0]}* dan *${couple[1]}*\n\nramalan:\n\n(+) *sisi positif*: ${positif}\n\n(-) *sisi negatif*: ${negatif}\n\nakurasi hubungan kalian berada dilevel: ${body.level}`)
                    } else {
                        reject(`sepertinya error, coba lagi nanti yah.`)
                    }
                } catch (err) {
                    reject(err)
                }
            })
            break
        default:
          break;
    }
})

module.exports = Primbon
