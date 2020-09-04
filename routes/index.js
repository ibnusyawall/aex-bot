/**
 * https://github.com/ibnusyawall/aex-bot
 * Date: 05/09/20
 * index.js
**/

const express  = require('express');
const { disk } = require('./../lib/WALIB')
const { WEB }  = require('./../lib/web')
const cwa = new WEB()

const router = express.Router();

router.get('/', function (req, res, next) {
    disk().then(data => {
        const { free, size } = data
        cwa.Message((error, { uread, tread } = {}) => {
            res.render('index', {
                title: 'AEX BOT',
                free: free,
                size: size,
                uread: uread,
                tread: tread
           })
        })
    })
})

router.get('/profile', function (req, res, next) {
    cwa.Profile((error, { name, nomor, platform, version, os } = {}) => {
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
    cwa.spamKey((error, { code } = {}) => {
        res.render('spam', {
            title: 'SPAM WA | AEX BOT',
            code: code
        })
    })
})

router.post('/spam-wa', (req, res, next) => {
    const { code, nomor, jumlah } = req.body

    cwa.spam(code, nomor, jumlah, (error, { errorM, message, code } = {}) => {
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
    const { nomor, pesan } = req.body

    cwa.MessagePrivate(nomor, pesan, (error, { errorM, message }) => {
        res.render('dchat', {
            title: 'DIRECT CHAT WA | AEX BOT',
            error: errorM,
            message: message
        })
    })
})

module.exports = router;
