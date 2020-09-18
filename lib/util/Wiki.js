var needle = require('needle')

const Wiki = (query) => new Promise((resolve, reject) => {
    var url = 'https://id.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles='

    needle(url + query, (err, resp, body) => {
        try {
            const datawiki = JSON.stringify(body).split('"extract":')[1]
            if (typeof datawiki !== 'undefined') {
                resolve({
                    query: query,
                    data: datawiki.replace(/\}|\\n/g, '')
                })
            } else {
                reject(`query ${query} tidak ditemukan`)
            }
        } catch (err) {
            reject(err)
        }
    })
})

module.exports = Wiki
