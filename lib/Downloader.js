require('dotenv').config()
var needle = require('needle')

var url = 'https://api.i-tech.id/dl'
var key = process.env.key

const Downloader = (type, link) => new Promise((resolve, reject) => {
    const _url = url + `/${type}?key=${key}&link=${link}`
    switch(type) {
        case 'fb':
            needle(_url, async (err, resp, body) => {
                try {
                    if (body.status !== 'error') {
                        const { title, link } = body
                        resolve({
                            title: title,
                            link: link
                        })
                    } else {
                        reject('data tidak ditemukan, periksa link dan coba lagi.')
                    }
                } catch (err) {
                    console.log(err)
                }
            })
            break
        case 'pin':
            needle(_url, async (err, resp, body) => {
                try {
                    if (body.status !== 'error') {
                        const { title, link } = body
                        resolve({
                            title: title,
                            link: link
                        })
                    } else {
                        reject('data tidak ditemukan, periksa link dan coba lagi.')
                    }
                } catch (err) {
                    console.log(err)
                }
            })
            break
        default:
            break
    }
})

module.exports = Downloader