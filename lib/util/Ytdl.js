var needle = require('needle')

const Ytdl =  (type, link) => new Promise((resolve, reject) => {
    const url = 'https://mpls.malahayatiislamicschool.sch.id'

    switch (type) {
        case 'mp3':
            needle(url + '/api/ytdla?link=' + link + '&no=mp3', (err, resp, body) => {
                try {
                    resolve([body.pesan])
                } catch (err) {
                    reject(err)
                }
            })
            break;
        case 'mp4':
            needle(url + '/api/ytdlv?link=' + link + '&no=mp3', (err, resp, body) => {
                try {
                    resolve([body.pesan])
                } catch (err) {
                    reject(err)
                }
            })
            break;
        default:
            break;
    }
})

module.exports = Ytdl
