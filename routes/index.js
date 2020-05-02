/**
 * AEX BOT PROJECT
 * Any question or problem ? Contact me!
 * Change Log : send media has been fixed.
**/

const express = require('express');
const totalDisk = require('./../lib/diskUsed')
const clWa = require('./../lib/clientWa')
const cwa = new clWa()
const disk = new totalDisk()

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  disk.cdisk((error, {
    free,
    size
  } = {}) => {
    cwa.tuMessage((error, {
      uread,
      tread
    } = {}) => {
      res.render('index', {
        title: 'AEX BOT',
        free: free,
        size: size,
        uread: uread,
        tread: tread
      });
    })
  })
});

router.get('/profile', function (req, res, next) {
  cwa.profile((error, {
    name,
    nomor,
    platform,
    version,
    os
  } = {}) => {
    res.render('profile', {
      title: 'PROFILE | AEX BOT',
      name: name,
      nomor: nomor,
      platform: platform,
      version: version,
      os: os
    })
  })
})

router.get('/spam-wa', function (req, res, next) {
  cwa.spamKey((error, {
    code
  } = {}) => {
    res.render('spam', {
      title: 'SPAM WA | AEX BOT',
      code: code
    })
  })

})
router.post('/spam-wa', (req, res, next) => {

  const code = req.body.code
  const nomor = req.body.nomor
  const jumlah = req.body.jumlah

  cwa.spam(code, nomor, jumlah, (error, {
    errorM,
    message,
    code
  } = {}) => {
    res.render('spam', {
      title: 'SPAM WA | AEX BOT',
      error: errorM,
      message: message,
      code: code
    })
  })
})

router.get('/direct-chat', (req, res, next) => {
  res.render('dchat', {
    title: 'DIRECT CHAT WA | AEX BOT'
  })
})
router.post('/direct-chat', (req, res, next) => {
  const nomor = req.body.nomor
  const pesan = req.body.pesan
  cwa.cchat(nomor, pesan, (error, {
    errorM,
    message
  }) => {
    res.render('dchat', {
      title: 'DIRECT CHAT WA | AEX BOT',
      error: errorM,
      message: message
    })
  })
})

module.exports = router;
