var needle = require('needle')


const Brainly = (query) => new Promise((resolve, reject) => {
    let url = 'https://smsh2h.net/api/brainly?query='

    if (query.length === 0) reject('❌ Harap masukan query yang ingin dicari!')
    needle(url + query, async (err, resp, body) => {
        try {
            resolve(body.result)
        } catch (err) {
            reject(err)
        }
    })
})


module.exports = Brainly
