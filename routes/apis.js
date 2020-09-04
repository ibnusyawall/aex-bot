/**
 * https://github.com/ibnusyawall/aex-bot
 * Date: 05/09/20
 * index.js
**/

var express = require('express');
const { disk } = require('./../lib/WALIB')
const { WEB }  = require('./../lib/web')
const cwa = new WEB()

var router = express.Router();

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

module.exports = router;
