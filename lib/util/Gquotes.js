var Canvas = require('canvas')
var glob = require('glob')
var fs = require('fs')
var { GetBase64 } = require('./GetBase64')

const generateQuotesDefault = async (text) => new Promise((resolve, reject) => {
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

    ctx.font = 53 + 'pt creation'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(text, 540, 620)

    let contentPath = 'quotes-aexbot.jpg'
    let output = await fs.createWriteStream(contentPath)
    let stream = await canvas.createJPEGStream({ quality: 1})
    stream.pipe(output)
    output.on('finish', async () => {
      GetBase64(process.cwd() + '/quotes-aexbot.jpg')
        .then(data => {
          resolve(data)
        })
    })
    return true
  })
})

const generateQuotes = async (from, text) => new Promise((resolve, reject) => {
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

    ctx.font = 53 + 'pt creation'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(text, 540, 620)

    let contentPath = 'quotes-aexbot.jpg'
    let output = await fs.createWriteStream(contentPath)
    let stream = await canvas.createJPEGStream({ quality: 1})
    stream.pipe(output)
    output.on('finish', async () => {
      GetBase64(process.cwd() + '/quotes-aexbot.jpg')
        .then(data => {
          resolve(data)
        })
    })
    return true
  }
})

module.exports = {
    generateQuotesDefault,
    generateQuotes
}
