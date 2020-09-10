/**
  * https://github.com/ibnusyawall/aex-bot
  * Date: 09/09/20
  * WALIB.js
**/

var fs = require('fs')
var superagent = require('superagent')
var html2json  = require('html-to-json')
var diskSpace  = require('check-disk-space')
var ttsId = require('node-gtts')('id')
var ttsEn = require('node-gtts')('en')
var jimp  = require('jimp')
var glob  = require('glob')
var qrcode   = require('qrcode')
var needle   = require('needle')
var moment   = require('moment-timezone')
var QRReader = require('qrcode-reader')
var Canvas = require('canvas')
var ytdl   = require('ytdl-core')

const menu = () => new Promise((resolve, reject) => {
    let list = `
    *-- AEX BOT WHATSAPP*

    Group Command:

      *'!setName <optional>'* Ubah Nama Group
      *'!setDesc <optional>'* Ubah Deskripsi Group
      *'!demote <@tagmember>'* Demote Admin
      *'!promote <@tagmember>'* Promote Member
      *'!kick <@tagmember>'* Kick Member
      *'!kickall'* Kick all members
      *'!kickme'* Kick bot from group
      *'!add <number>'* Invite Member
      *'!owner'* Melihat Siapa Owner Group
      *'!getall'* Tag all members group

    Other Command:

      *'!quotes'* Auto Quotes
      *'!quotesmaker <size> <colorFont> <quotes>'* Quotes Maker
      *'!toxic'* Auto Toxic 

      *'!igdl <linkIG>'* IG Auto Downloader
      *'!ytmp3 <linkYT>'* Youtube MP3 Downloader
      *'!ytmp4 <linkYT>'* Youtube MP4 Downloader
      *'!qr <optional>'* QR Code Maker
      *'!tts [en/id] <optional>'* Text To Speech
      *'!js <namaKota>'* Cek Jadwal Sholat
      *'!wiki <query>'* Search on Wikipedia

      *'!sial <ttl>'* Cek hari sial kamu berdasarkan tanggal lahir
      *'!jodoh <nama1>&<nama2>'* Cek apakah dia cocok dengan kamu?
      *'!artinama <nama>'* Cek arti dari nama tersebut
      *'!sifat <nama> <ttl>'* Cek sifat berdasarkan nama dan tanggal lahir

      *'!jnt <koderesi/waybill>'* Melacak kode resi J&T
      *'!lex <koderesi/waybill>'* Melacak kode resi Lex
      *'!lion <koderesi/waybill>'* Melacak kode resi Lion
      *'!pos <koderesi/waybill>'* Melacak kode resi POS
      *'!tiki <koderesi/waybill>'* Melacak kode resi TiKi
      *'!sicepat <koderesi/waybill>'* Melacak kode resi Sicepat
      *'!anteraja <koderesi/waybill>'* Melacak kode resi AnterAja

      *'!randomnime'* Merandom gambar segar animek
      *'!randomhentai'* Merandom gambar segar hentai

      *'!botjoin <linkGroup>'* Undang Bot Ke Group Kalian
      *'!krisar kritik dan saran kamu'* Mengirim kritik dan saran

    README!
      *<optional>* diisi dengan text tanpa tanda '<' dan '>'.
      contoh: !qr membuat qr dengan bot itu mudah

      *<@tagmember>* diisi dengan men-tag salah satu member group, tanpa tanda '<' dan '>'.
      contoh: !promote @si-anu

      *<number>* diisi dengan nomor whatsapp valid dengan awalan 0 ataupun 62, tanpa tanda '<' dan '>'.
      contoh: !add 082299265151

      *<size> <colorFont> <quotes>* diisi dengan size text, warna text dan quotes, tanpa tanda '<' dan '>'.
      contoh: !quotesmaker 55 white ini contoh quotes.

      *<linkGroup>* diisi dengan link group yang valid tanpa tanda '<' dan '>'.
      contoh: !botjoin https://chat.whatsapp.com/DBHTdnFW7bD45FwfdIGZHI

      *<linkYT>* diisi dengan link youtube yang valid tanpa tanda '<' dan '>'.
      contoh: !ytmp3 https://youtu.be/-77bLbwQw2o

      *<namaKota>* diisi dengan nama kota yang valid tanpa tanda '<' dan '>'.
      contoh: !js bogor

      *<query>* diisi dengan query valid tanpa tanda '<' dan '>'.
      contoh: !wiki apa itu nodejs?

      *<ttl>* diisi dengan tanggal lahir valid tanpa tanda '<' dan '>'.
      contoh: !sial 24/12/2005

      *<koderesi>* diisi dengan kode resi yang kamu cari tanpa tanda '<' dan '>'.
      contoh: !jnt J01234567

    `;
    resolve(list)
})

const about = () => new Promise((resolve, reject) => {
  let list = `
  [+] -----  AEX BOT GROUP ----- [+]

  Author: Ibnusyawall
  Contact: +6282299265151 | https://t.me/isywl
  Fork me on *GitHub*: https://github.com/ibnusyawall/aex-bot

  [+] -----  AEX BOT GROUP ----- [+]
  `
  resolve(list)
})

const quotes = () => new Promise((resolve, reject) => {
  let arr = [
    'Bagi dunia, kamu mungkin satu orang, tetapi bagi satu orang kamu adalah dunia.',
    'Cinta mungkin hadir karena takdir tapi tak ada salahnya kita saling memperjuangkan.',
    'Cinta adalah d imana kamu selalu punya alasan untuk kembali meski kamu sudah berjalan begitu jauh.',
    'Dalam cinta, menyerah tak selalu berarti kamu lemah. Kadang itu hanya berarti kamu cukup kuat tuk melepaskannya.',
    'Kamu mungkin memegang tanganku untuk sementara waktu, tetapi kamu memegang hatiku selamanya.',
    'Saat aku bersamamu, aku akan melepaskan segala ketakutan dan kecemasan.',
    'Kamu nyaman? Kamu sayang? Tapi cuma dianggap temen? Kadang gitu. Nyamanmu belum tentu nyamannya. Cukup dipahami aja.',
    'Dibilang sayang? Iya. Dibilang cinta? Iya. Dibilang pacar? Bukan.',
    'Apakah namamu WiFi? Soalnya aku bisa merasakan konektivitas.',
    'Bersamamu aku tidak pernah takut lagi menjadi pemimpi.',
    'Move on itu pilihan. Gagal move on itu cobaan. Pura-pura move on itu pencitraan.',
    'Sepurane aku nggak nguber awakmu maneh. Kepastianmu abstrak, podo karo raimu.',
    'You`re just my cup of tea.',
    'My love belongs to you.',
    'I love you - those three words have my life in them.',
    'You are my strength but loving you is my biggest weakness.',
    'I promise that i`ll love you in every step of mine',
    'Aku tidak pernah keberatan menunggu siapa pun berapa lama pun selama aku mencintainya.',
    'Aku tak ingin berakhir seperti mereka, saling mencintai. Lantas kehilangan dan kini mereka hanya mengenang dan merenung dari jauh.',
    'Kau mencintaiku tanpa sepatah kata, aku mencintaimu, dengan satu kata yang tak pernah patah.',
    'Allah menciptakan senja untuk mengingatkanku untuk pulang pada cinta yang kukenang.',
    'Cinta tak berupa tatapan satu sama lain, tetapi memandang keluar bersama ke arah yang sama.',
    'Cinta tidak terlihat dengan mata, tetapi dengan hati.',
    'Cinta itu layaknya angin, aku tidak bisa melihatnya tetapi aku bisa merasakannya.',
    'Cinta tidak pernah menuntut, cinta selalu memberi. Cinta selalu menderita, tanpa pernah meratap, tanpa pernah mendendam.',
    'Masa lalu saya adalah milik saya, masa lalu kamu adalah milik kamu, tapi masa depan adalah milik kita.',
    'Bahagia itu kita yang ciptain, bukan mereka.',
    'Cinta itu, rela melihat orang yang kita cintai bahagia bareng orang lain.',
    'Aku hanyalah kunang-kunang, dan kau hanyalah senja, dalam gelap kita berbagi, dalam gelap kita abadi.',
    'Dalam diam, aku memperjuangkan cintamu dalam doaku.',
  ]
  let acak = arr[Math.floor(Math.random() * arr.length)]
  resolve(acak)
})

const toxic = () => new Promise((resolve, reject) => {
  let kata = [
    'babi',
    'monyet',
    'anjing',
    'rizky',
    'jembut',
    'memek',
    'kontol',
    'tempik',
    'tempik',
    'gay',
    'lesbi',
    'yoga',
    'setan',
    'cangcut',
    'bagong',
    'bangsat',
    'ngentot'
  ]
  let randKata = kata[Math.floor(Math.random() * kata.length)]
  let list = [
    `muka lo kek ${randKata}`, `anda tau ${randKata} ?`,`${randKata} Lo ${randKata}`,
    `ngapa ${randKata} ga seneng?`,`ribut sini lo ${randKata}`,`jangan ngakak lo ${randKata}`,
    `wey ${randKata}!!`,`aku sih owh aja ya ${randKata}`,`ga seneng send lokasi lo ${randKata}`,
    `capek w ${randKata}`, `hari ini kau minat gelut ${kata[2]} ?`, `w tw lo itu ${randKata}`,
    `w ganteng dan lo kek ${randKata}`,`bucin lo ${randKata}`,`najis baperan kek ${randKata}`,
    `nge-teh ${randKata}`,`gaya lo sok iye, mukalo kek ${randKata}`,`${randKata} awokwowkok`
   ]
   resolve(list[Math.floor(Math.random() * list.length)])
})

const getBase64 = (file) => new Promise((resolve, reject) => {
  let result  = fs.readFileSync(file).toString('base64')
  resolve(result)
})

const qrMaker = (text) => new Promise((resolve, reject) => {
  run().catch(error => console.error(error.stack))

  async function run() {
    const res = await qrcode.toDataURL(text, {
      errorCorrectionLevel: 'H'
    })

    resolve(res.replace('data:image/png;base64,', ''))
  }
})

const ytdL =  (type, link) => new Promise((resolve, reject) => {
    switch (type) {
        case 'mp3':
            const pathmp3 = process.cwd() + '/ytdl_botaex.mp3'
            const stream = ytdl(link, {filter: 'audioonly'})

            stream.on('error', err => reject(err))
            stream.on('end', () => {
                getBase64(pathmp3).then(data => {
                    resolve(data)
                })
            })
            stream.pipe(fs.createWriteStream(pathmp3))
            break;
        case 'mp4':
            const pathmp4 = process.cwd() + '/ytdl_botaex.mp4'
            const streams = ytdl(link, {filter: 'videoonly'})

            streams.on('error', err => reject(err))
            streams.on('end', () => {
                getBase64(pathmp4).then(data => {
                    resolve(data)
                })
            })
            streams.pipe(fs.createWriteStream(pathmp4))
            break;
        default:
            break;
    }
})

const tts = (options, text) => new Promise((resolve, reject) => {
  try {
    switch (options) {
      case 'id':
        let pathID = process.cwd() + '/ttsID.mp3'
        ttsId.save(pathID, text, () => {
          console.log('ok tts [id]')
          getBase64(pathID)
            .then(data => {
              resolve(data)
            })
        })
        break;
      case 'en':
        let pathEN = process.cwd() + '/ttsEN.mp3'
        ttsEn.save(pathEN, text, () => {
          console.log('ok tts [en]')
          getBase64(pathEN)
            .then(data => {
              resolve(data)
            })
        })
        break;
      default:
        console.log('piilih bahasa: \n\n*id* untuk bahasa indonesia \n*en* untuk bahasa inggris')
        break;
    }
  } catch (err) {
    reject(err)
  }
})

const disk = () => new Promise((resolve, reject) => {
  const toGb = (v) => {
    let byteToGb = 1024*1024*1024
    return Number.parseFloat(v/byteToGb).toFixed()
  }
  diskSpace(require('os').homedir())
    .then(disk => {
      resolve({
        free: toGb(disk.free),
        size: toGb(disk.size)
      })
    })
})

const generateQuotesDefault = async (size, color, text) => new Promise((resolve, reject) => {
  Canvas.registerFont(process.cwd() + '/lib/assets/fonts/creation/creation.ttf', { family: 'creation' })

  let dirImageDefault = process.cwd() + '/lib/assets/bg_quotes/*.*'
  let arrImg = new Array()

  glob(dirImageDefault, async (err, files) => {
    files.map(file_ => {
      arrImg.push(file_.replace(process.cwd(), ''))
      return
    })
    let arr = arrImg[Math.floor(Math.random() * arrImg.length)]
    let canvas = Canvas.createCanvas(1080, 1080)
    let ctx = canvas.getContext('2d')

    let Image = Canvas.Image
    let img = new Image()
    img.src = '.' + arr

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    ctx.font = size + 'pt creation'
    ctx.fillStyle = color
    ctx.textAlign = 'center'
    ctx.fillText(text, 540, 620)

    let contentPath = 'quotes-aexbot.jpg'
    let output = await fs.createWriteStream(contentPath)
    let stream = await canvas.createJPEGStream({ quality: 1})
    stream.pipe(output)
    output.on('finish', async () => {
      getBase64(process.cwd() + '/quotes-aexbot.jpg')
        .then(data => {
          resolve(data)
        })
    })
    return true
  })
})

const generateQuotes = async (from, size, color, text) => new Promise((resolve, reject) => {
  run().catch(err => console.log(err))

  async function run() {
    Canvas.registerFont(process.cwd() + '/lib/assets/fonts/creation/creation.ttf', { family: 'creation' })

    let canvas = Canvas.createCanvas(1080, 1080)
    let ctx = canvas.getContext('2d')

    let Image = Canvas.Image
    let img = new Image()
    img.src = from

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    ctx.font = size + 'pt creation'
    ctx.fillStyle = color
    ctx.textAlign = 'center'
    ctx.fillText(text, 540, 620)

    let contentPath = 'quotes-aexbot.jpg'
    let output = await fs.createWriteStream(contentPath)
    let stream = await canvas.createJPEGStream({ quality: 1})
    stream.pipe(output)
    output.on('finish', async () => {
      getBase64(process.cwd() + '/quotes-aexbot.jpg')
        .then(data => {
          resolve(data)
        })
    })
    return true
  }
})

const jadwalSholat = (kota) => new Promise((resolve, reject) => {
  var url = 'https://api.banghasan.com/sholat/format/json'
  var kodekota = new Array()
  var tanggal  = moment.tz('Asia/Jakarta').format('YYYY-MM-DD')

  needle(url + '/kota/nama/' + kota, (err, resp, body) => {
    if (err) throw err

    switch (body.kota.length) {
      case 0:
        reject('nama kota tidak ditemukan.\n\nmore information: https://api.banghasan.com/.')
        break;
      default:
        kodekota.push(body.kota[0]['id'])
        needle(url + '/jadwal/kota/' + kodekota[0] + '/tanggal/' + tanggal, (err, resp, body) => {
            if (err) throw err

            resolve([body.jadwal.data])
        })
        break;
    }
  })
})

const igdl = (link) => new Promise((resolve, reject) => {
   var isLink = link.match(/^https:\/\/www.instagram(?:\.com)/g)

   if (isLink != null) {
     let oku = link.split('/')
     let url = link.indexOf('?') >= 0 ? link.split('/').splice(0, oku.length - 1).join('/') + '/': (link.split('').pop() == '/' != true ? link + '/' : link)
     needle(url + '?__a=1', {json: true}, (err, resp, body) => {
       if (JSON.stringify(body).length < 3) {
           reject('account has private mybe.')
       } else {
           const { full_name, username }    = body.graphql.shortcode_media.owner
           const { video_url, display_url } = body.graphql.shortcode_media
           const { count } = body.graphql.shortcode_media.edge_media_preview_like
           switch (body.graphql.shortcode_media.is_video) {
               case true:
                   let pathv = 'video_ig.mp4'
                   let datav = fs.createWriteStream(pathv)
                   needle.get(video_url).pipe(datav).on('finish', () => {
                        let file = fs.readFileSync(pathv).toString('base64')
                        resolve({
                            author: `${full_name} | @${username}`,
                            like: count,
                            type: 'video',
                            link: video_url,
                            data: file
                        })
                   })
                   break;
               case false:
                   let pathp = 'image_ig.jpg'
                   let datap = fs.createWriteStream(pathp)
                   needle.get(display_url).pipe(datap).on('finish', () => {
                        let file = fs.readFileSync(pathp).toString('base64')
                        resolve({
                            author: `${full_name} | @${username}`,
                            like: count,
                            type: 'image',
                            link: display_url,
                            data: file
                        })
                   })
                   break;
               default:
                   break;
           }
       }
     })
   }
   else { reject('url mybe not valid.') }
})

const wikipedia = (query) => new Promise((resolve, reject) => {
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

const primbon = (type, text) => new Promise((resolve, reject) => {
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

const cekresi = (kurir, waybill) => new Promise((resolve, reject) => {
    var url = 'https://api.binderbyte.com/cekresi'
    var result = ''
    const api = ['d4486f8afbb4d91b8ffc8a3a33d7fabedfb74599c8c4366329a2e7aed014b1ba']
    switch (kurir) {
        case 'anteraja':
            needle(url + '?awb=' + waybill + `&api_key=${api[0]}&courier=anteraja`, (err, resp, body) => {
                try {
                    const data = JSON.parse(body)

                    if (data['result'] === true) {
                        const { courier, waybill, process, shipped } = data['data']
                        const { name, date, status } = data['data']['received']

                        result += `
📦 Ekspedisi anteraja
 └ ${courier}

📮 Status
 └ ${status}

📃 Resi
 ├ ${waybill}
 └ ${shipped}

🚧 POD Detail\n`
                        data['data']['tracking'].map(({ date, desc, status }) => {
                            result += `
⏰ ${date}
 └ ${desc} (${status})\n`
                        })
                        resolve(result)
                    } else {
                        reject(`❌ Nomor Resi anteraja ${waybill} tidak ditemukan / info terpending.`)
                    }
                } catch (err) {
                    reject(err)
                }
            })
            break;
        case 'lion':
            needle(url + '?awb=' + waybill + `&api_key=${api[0]}&courier=lion`, (err, resp, body) => {
                try {
                    const data = JSON.parse(body)

                    if (data['result'] === true) {
                        const { courier, waybill, process, shipped } = data['data']
                        const { name, date, status } = data['data']['received']

                        result += `
📦 Ekspedisi Lion Parcel
 └ ${courier}

📮 Status
 └ ${status}

📃 Resi
 ├ ${waybill}
 └ ${shipped}

🚧 POD Detail\n`
                        data['data']['tracking'].map(({ date, desc, status }) => {
                            result += `
⏰ ${date}
 └ ${desc} (${status})\n`
                        })
                        resolve(result)
                    } else {
                        reject(`❌ Nomor Resi Lion Parcel ${waybill} tidak ditemukan / info terpending.`)
                    }
                } catch (err) {
                    reject(err)
                }
            })
            break;
        case 'lex':
            needle(url + '?awb=' + waybill + `&api_key=${api[0]}&courier=lex`, (err, resp, body) => {
                try {
                    const data = JSON.parse(body)

                    if (data['result'] === true) {
                        const { courier, waybill, process, shipped } = data['data']
                        const { name, date, status } = data['data']['received']

                        result += `
📦 Ekspedisi LEX
 └ ${courier}

📮 Status
 └ ${status}

📃 Resi
 ├ ${waybill}
 └ ${shipped}

🚧 POD Detail\n`
                        data['data']['tracking'].map(({ date, desc, status }) => {
                            result += `
⏰ ${date}
 └ ${desc} (${status})\n`
                        })
                        resolve(result)
                    } else {
                        reject(`❌ Nomor Resi LEX ${waybill} tidak ditemukan / info terpending.`)
                    }
                } catch (err) {
                    reject(err)
                }
            })
            break;
        case 'tiki':
            needle(url + '?awb=' + waybill + `&api_key=${api[0]}&courier=tiki`, (err, resp, body) => {
                try {
                    const data = JSON.parse(body)

                    if (data['result'] === true) {
                        const { courier, waybill, process, shipped } = data['data']
                        const { name, date, status } = data['data']['received']

                        result += `
📦 Ekspedisi TIKI
 └ ${courier}

📮 Status
 └ ${status}

📃 Resi
 ├ ${waybill}
 └ ${shipped}

🚧 POD Detail\n`
                        data['data']['tracking'].map(({ date, desc, status }) => {
                            result += `
⏰ ${date}
 └ ${desc} (${status})\n`
                        })
                        resolve(result)
                    } else {
                        reject(`❌ Nomor Resi TIKI ${waybill} tidak ditemukan / info terpending.`)
                    }
                } catch (err) {
                    reject(err)
                }
            })
            break;
        case 'pos':
            needle(url + '?awb=' + waybill + `&api_key=${api[0]}&courier=pos`, (err, resp, body) => {
                try {
                    const data = JSON.parse(body)

                    if (data['result'] === true) {
                        const { courier, waybill, process, shipped } = data['data']
                        const { name, date, status } = data['data']['received']

                        result += `
📦 Ekspedisi POS
 └ ${courier}

📮 Status
 └ ${status}

📃 Resi
 ├ ${waybill}
 └ ${shipped}

🚧 POD Detail\n`
                        data['data']['tracking'].map(({ date, desc, status }) => {
                            result += `
⏰ ${date}
 └ ${desc} (${status})\n`
                        })
                        resolve(result)
                    } else {
                        reject(`❌ Nomor Resi POS ${waybill} tidak ditemukan / info terpending.`)
                    }
                } catch (err) {
                    reject(err)
                }
            })
            break;
        case 'jnt':
            needle(url + '?awb=' + waybill + `&api_key=${api[0]}&courier=jnt`, (err, resp, body) => {
                try {
                    const data = JSON.parse(body)

                    if (data['result'] === true) {
                        const { courier, waybill, process, shipped } = data['data']
                        const { name, date, status } = data['data']['received']

                        result += `
📦 Ekspedisi J&T
 └ ${courier}

📮 Status
 └ ${status}

📃 Resi
 ├ ${waybill}
 └ ${shipped}

🚧 POD Detail\n`
                        data['data']['tracking'].map(({ date, desc, status }) => {
                            result += `
⏰ ${date}
 └ ${desc} (${status})\n`
                        })
                        resolve(result)
                    } else {
                        reject(`❌ Nomor Resi J&T ${waybill} tidak ditemukan / info terpending.`)
                    }
                } catch (err) {
                    reject(err)
                }
            })
            break;
        case 'sicepat':
            needle(url + '?awb=' + waybill + `&api_key=${api[0]}&courier=sicepat`, (err, resp, body) => {
                try {
                    const data = JSON.parse(body)

                    if (data['result'] === true) {
                        const { courier, waybill, process, shipped } = data['data']
                        const { name, date, status } = data['data']['received']

                        result += `
📦 Ekspedisi SICEPAT
 └ ${courier}

📮 Status
 └ ${status}

📃 Resi
 ├ ${waybill}
 └ ${shipped}

🚧 POD Detail\n`
                        data['data']['tracking'].map(({ date, desc, status }) => {
                            result += `
⏰ ${date}
 └ ${desc} (${status})\n`
                        })
                        resolve(result)
                    } else {
                        reject(`❌ Nomor Resi SICEPAT ${waybill} tidak ditemukan / info terpending.`)
                    }
                } catch (err) {
                    reject(err)
                }
            })
            break;
        default:
            break;
    }
})

const random_anim_hentai = (type) => new Promise((resolve, reject) => {
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

module.exports = {
  menu,
  about,
  quotes,
  toxic,
  getBase64,
  qrMaker,
  ytdL,
  tts,
  disk,
  generateQuotesDefault,
  generateQuotes,
  jadwalSholat,
  igdl,
  wikipedia,
  primbon,
  cekresi,
  random_anim_hentai
}
