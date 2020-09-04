/**
 * https://github.com/ibnusyawall/aex-bot
 * Date: 25/08/20
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

const menu = () => new Promise((resolve, reject) => {
    let list = `
    *-- AEX BOT WHATSAPP*

    Group Command:

      *'!setName <optional>'* Ubah Nama Group
      *'!setDesc <optional>'* Ubah Deskripsi Group
      *'!demote <@tagmember>'* DEMOTE
      *'!promote <@tagmember>'* PROMOTE
      *'!kick <@tagmember>'* TENDANG
      *'!add <number>'* UNDANG
      *'!owner'* Melihat Siapa Owner Group

    Other Command:

      *'!quotes'* Auto Quotes
      *'!quotesmaker <size> <colorFont> <quotes>'* Quotes Maker
      *'!toxic'* Auto Toxic 
      *'!ytmp3 <linkYT>'* Youtube MP3 Downloader
      *'!qr <optional>'* QR Code Maker
      *'!tts [en/id] <optional>'* Text To Speech
      *'!botjoin <linkGroup>'* Undang Bot Ke Group Kalian
      *'!js <namaKota>'* Cek Jadwal Sholat

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
  let files  = fs.readFileSync(file)
  let result = files.toString('base64')
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

const readQR = (file) => new Promise((resolve, reject) => {
  run().catch(error => console.error(error.stack))

  async function run() {
    const img = await jimp.read(fs.readFileSync(file))
    const qr  = new QRReader()

    const value = await new Promise((resolve, reject) => {
      qr.callback = (err, v) => err != null ? reject(err) : resolve(v)
      qr.decode(img.bitmap)
    })

    for (const point of value.points) {
      img.scan(Math.floor(point.x) - 5, Math.floor(point.y) - 5, 10, 10, function(x, y, idx) {
        this.bitmap.data[idx] = 255
        this.bitmap.data[idx + 1] = 0
        this.bitmap.data[idx + 2] = 0
        this.bitmap.data[idx + 3] = 255
      })
    }

    await img.writeAsync(process.cwd() + '/readQR.jpeg')

    resolve(value)
  }
})

const ytDlMP3 = (link) => new Promise((resolve, reject) => {
  const getID = new Promise((resolve, reject) => {
    try {
      superagent.post('https://mate12.y2mate.com/mp3/ajax').send({
        url: link,
        ajax: '1',
      }).set('content-type', 'application/x-www-form-urlencoded; charset=UTF-8').end((err, res) => {
        if (err) throw err
        const data = JSON.parse(res.text)
        const html = data.result
        const _id_ = html.indexOf('_id:')
        const _vid = html.indexOf('v_id:')
        const __id = html.slice(_id_, _id_+31).split(' ')[1]
        const __vid= html.slice(_vid, _vid+19).split(' ')[1]
        resolve({
          id: __id.replace(/[\']/gi, ""),
          vid: __vid.replace(/[\']/gi, "")
        })
      })
    } catch (err) {
      reject(console.log(err))
    }
  })

  getID
  .then(data => {
    const {id, vid} = data
    superagent.post('https://mate06.y2mate.com/mp3Convert').send({
      type: 'youtube',
      _id: `${id}`,
      v_id: `${vid}`,
      mp3_type: '128'
    }).set('content-type', 'application/x-www-form-urlencoded; charset=UTF-8').end((err, res) => {
      if (err) throw err
      let data = JSON.parse(res.text)
      html2json.parse(data.result, {
        'link': ['a', (l) => {
           return l.attr('href')
        }]
      }, (err, result) => {
        try {
          let path = 'aexbot-yt.mp3'
          let data = fs.createWriteStream(path)
          needle.get(result['link'][0]).pipe(data).on('finish', () => {
              let file = fs.readFileSync(path).toString('base64')
              resolve(file)
          })
        } catch (err) {
          console.error(err)
        }
      })
    })
  })

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

const glowtext = (text) => new Promise((resolve, reject) => {
  this.url = 'https://textpro.me/advanced-glow-text-effect-873.html'
  needle.get(this.url, (err, resp, body) => {
    resolve(resp.headers)
    html2json.parse(body, {
      'token': ['input', (i) => {
        return i.attr('value')
      }]
    }, (err, result) => {
      this.token = result['token'][3]
      needle.post(this.url, {
        'text[]': text,
        'submit': 'Go',
        'token': this.token
      }, (err, resp, body) => {
        resolve(this.token)
      })
    })
  })
})

const jadwalSholat = (kota) => new Promise((resolve, reject) => {
  var url = 'https://api.banghasan.com/sholat/format/json'
  var kodekota = new Array()
  var tanggal  = moment.tz('Asia/Jakarta').format('YYYY-MM-DD')

  needle(url + '/kota/nama/' + kota, (err, resp, body) => {
    if (err) throw err

    switch (body.kota.length) {
      case 0:
        reject('nama kota tidak ditemukan.')
        break;
      default:
        kodekota.push(body.kota[0]['id'])
        break;
    }
    needle(url + '/jadwal/kota/' + kodekota[0] + '/tanggal/' + tanggal, (err, resp, body) => {
      if (err) throw err

      resolve([body.jadwal.data])
    })
  })
})

module.exports = {
  menu,
  about,
  quotes,
  toxic,
  getBase64,
  qrMaker,
  readQR,
  ytDlMP3,
  tts,
  disk,
  generateQuotesDefault,
  generateQuotes,
  jadwalSholat
}
