require('dotenv').config()
var needle = require('needle')


const Brainly = (query) => new Promise((resolve, reject) => {
    var url = 'https://api.i-tech.id'
    var key = process.env.key

    if (query.length === 0) { reject('❌ Harap masukan query yang ingin dicari!') }
    needle(url + '/tools/brainly?key=' + key + '&query=' + query, async (err, resp, body) => {
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

module.exports = Brainly