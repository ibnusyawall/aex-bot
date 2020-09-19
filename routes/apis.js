/**
 * https://github.com/ibnusyawall/aex-bot
 * Date: 05/09/20
 * index.js
**/

var express = require('express')
var ytdl   = require('ytdl-core')
var { Disk } = require('./../lib/index')
var { WEB }  = require('./../lib/web')
var cwa = new WEB()

var router = express.Router()

router.get('/main', function (req, res, next) {
    disk()
      .then(data => {
          const { free, size } = data
          cwa.Message((error, { uread, tread } = {}) => {
              res.status(200).json({
                  freeDisk: free,
                  totalDisk: size,
                  totalMessage: tread
              })
          })
      })
})

router.get('/profile', function (req, res, next) {
    cwa.Profile((error, { name, nomor, platform, version, os } = {}) => {
        res.status(200).json({
            name: name,
            nomor: nomor,
            platform: platform,
            version: version,
            os: os
        })
    })
})

router.post('/sendMessage', function (req, res, next) {
    const { nomor, pesan } = req.body
    cwa.MessagePrivate(nomor, pesan, (error, { errorM, message }) => {
        res.status(200).json({
            error: errorM,
            message: message
        })
    })
})


router.post('/ytdl', function (req, res, next) {
    const { type, link } = req.body

    switch (type) {
        case 'mp3':
            const pathmp3 = process.cwd() + '/ytdl_botaex.mp3'
            const stream = ytdl(link, {filter: 'audioonly'})

            stream.on('error', err => reject(err))
            stream.on('end', () => {
                getBase64(pathmp3).then(data => {
                    ytdl.getBasicInfo(link).then(is => {
                        res.status(200).json({
                            title: is.videoDetails.title,
                            like: is.likes,
                            viewer: is.viewCount,
                            data: data
                        })
                    })
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
                    ytdl.getBasicInfo(link).then(is => {
                        res.status(200).json({
                            title: is.videoDetails.title,
                            like: is.likes,
                            viewer: is.viewCount,
                            data: data
                        })
                    })
                })
            })
            streams.pipe(fs.createWriteStream(pathmp4))
            break;
        default:
            break;
    }
})

module.exports = router;
