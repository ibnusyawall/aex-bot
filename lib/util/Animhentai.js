var needle = require('needle')
var fs = require('fs')

const Animhentai = (type) => new Promise((resolve, reject) => {
    var url = 'https://api.computerfreaker.cf/v1/'

    switch (type) {
        case 'anim':
            needle(url + 'anime', (err, resp, body) => {
                try {
                    let path = 'random_anim.jpg'
                    let data = fs.createWriteStream(path)
                    needle.get(body.url).pipe(data).on('finish', () => {
                        let file = fs.readFileSync(path).toString('base64')
                        resolve({
                            type: 'anim',
                            data: file
                        })
                    })
                } catch (err) {
                    reject(err)
                }
            })
            break;
        case 'hentai':
            needle(url + 'nsfwneko', (err, resp, body) => {
                try {
                    let path = 'random_hentai.jpg'
                    let data = fs.createWriteStream(path)
                    needle.get(body.url).pipe(data).on('finish', () => {
                        let file = fs.readFileSync(path).toString('base64')
                        resolve({
                            type: 'anim',
                            data: file
                        })
                    })
                } catch (err) {
                    reject('maaf sepertinya error.')
                }
            })
            break;
        default:
            break;
    }
})

module.exports = Animhentai
