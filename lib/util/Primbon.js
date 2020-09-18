var needle = require('needle')
var html2json  = require('html-to-json')

const Primbon = (type, text) => new Promise((resolve, reject) => {
    var url = 'http://www.primbon.com/'

    switch (type) {
        case 'sial':
            const sial = text.split(/\W/g)

            const datas = {
                tgl: sial[0],
                bln: sial[1],
                thn: sial[2],
                submit: 'Submit'
            }

            needle.post(url + 'primbon_hari_naas.php', datas, (err, resp, body) => {
                try {
                    let data = String(body).split('<b>PRIMBON HARI NAAS</b><br><br>')[1].split('<!-- END: CONTENT 1 ADV -->')[0].replace(/<[^>]*>?/gm, '')
                    resolve({
                        title: `Primbon Hari Naas: ${text}`,
                        data: data
                    })
                } catch (err) {
                    reject('maaf sepertinya error.')
                }
            })
            break;
        case 'jodoh':
            const jodoh = text.split('&')

            needle(url + 'kecocokan_nama_pasangan.php?nama1=' + jodoh[0] + '&nama2=' + jodoh[1] + '&proses=Submit', (err, resp, body) => {
                try {
                    let data = String(body).split('<b>KECOCOKAN JODOH BERDASARKAN NAMA PASANGAN</b><br><br>')[1].split('<a href="kecocokan_nama_pasangan.htm" class="button">&lt; Hitung Kembali</a>')[0].replace(/<[^>]*>?/gm, '')
                    resolve({
                        title: `Keccokan Jodoh ${jodoh[0]} dan ${jodoh[1]}`,
                        data: data
                    })
                } catch (err) {
                    reject('maaf sepertinya error.')
                }
            })
            break;
        case 'artinama':
            needle(url + 'arti_nama.php?nama1=' + text.replace(/W/g, '+') + '&proses=Submit', (err, resp, body) => {
                try {
                    let data = body.toString().split('arti:')[1].split('<TABLE>')[0].toString().replace(/<[^>]*>?/gm, '')
                    resolve({
                        title: `Arti Nama *${text}*`,
                        data: data
                    })
                } catch (err) {
                    reject('maaf sepertinya error.')
                }
            })
            break;
        case 'sifat':
            const sifat  = text.split(/\s/g)
            const nama = sifat.slice(0, sifat.length - 1).join(' ')
            const ttl  = sifat.pop().split(/\W/g)
            const data = {
                nama: nama,
                tanggal: ttl[0],
                bulan: ttl[1],
                tahun: ttl[2],
                submit: 'Submit'
            }

            needle.post(url + 'sifat_karakter_tanggal_lahir.php', data, (err, resp, body) => {
                try {
                    html2json.parse(body, {
                        'data': function ($doc) {
                           return  $doc.find('i').text()
                         }
                    }, (err, result) => {
                        const {tanggal, bulan, tahun} = data
                        resolve({
                            title: `Sifat Karakter *${nama}* ( ${tanggal}/${bulan}/${tahun} )`,
                            data: result['data']
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

module.exports = Primbon
