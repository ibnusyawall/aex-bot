require('dotenv').config()
var needle = require('needle')
var fs = require('fs')

const Gquotes = (type, author, text) => new Promise((resolve, reject) => {
    if (!type && !author && !text) { reject(`silahkan masukan argumen author|type quotes.`) }
    var url = `https://api.i-tech.id/tools/qtm?key=${process.env.key}&type=${type}&author=${author}&text=${text.replace(/ +/g, '+')}`
    
    needle(url, async (err, resp, body) => {
        try {
            if (body.status !== 'error') {
                const { result } = body
                let path = 'quotes.jpg'
                let data = fs.createWriteStream(path)
                needle.get(result).pipe(data).on('finish', () => {
                    let file = fs.readFileSync(path).toString('base64')
                    resolve(`data:image/jpeg;base64,${file}`)
                })
            } else {
                reject(err)
            }
        } catch (err) {
            reject(err)
            console.log(err)
        }
    })
})

module.exports = Gquotes
