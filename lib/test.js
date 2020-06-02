// debugging ytdl
// node test.js https://youtu.be/LGIYRoC9cwA

const { ytDl } = require('./ytdl')
const needle = require('needle')
const fs = require('fs')

const ytdl = new ytDl()
ytdl.mp3(process.argv[2], (error, {
    link
  } = {}) => {
  const dataFile = fs.createWriteStream('aex-bot|ytdl.mp3')
  needle.get(link).pipe(dataFile).on('finish', () => {
    const file = fs.readFileSync('./aex-bot|ytdl.mp3').toString('base64')
    console.log('harap tunggu, file sedang diproses dan akan segera dikirimkan.')
    console.log(file)
  })
})
