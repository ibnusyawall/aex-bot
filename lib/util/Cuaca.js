var needle = require('needle')


const Cuaca = (kota) => new Promise((resolve, reject) => {
    if (typeof kota === 'undefined') reject('Harap masukan nama kota.')

    let url = 'https://smsh2h.net/api/cuaca?kota='
    needle(url + kota, async (err, rssp, body) => {
        try {
            if (body.cuaca == null) {
                reject(`Nama kota ${kota} tidak ditemukan.`)
            } else {
                resolve(body)
            }
        } catch (ere) {
            reject(err)
        }
    })
})


Cuaca(process.argv[2]).then(data => {
    console.log(data)
}).catch(err => {
     console.log(err)
})

module.exports = Cuaca
