const express = require('express');

// use custom library
const totalDisk = require('./../lib/diskUsed')
//const mySqlDB = require('./../lib/db')
const clWa = require('./../lib/clientWa')

const cwa = new clWa()
//const _db = new mySqlDB('conn')
const disk  = new totalDisk()

// use custom library

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  disk.cdisk((error, {free, size} = {} ) => {
    //_db.totalhit((error, {data} = {} ) => {
      cwa.tuMessage((error, {uread, tread} = {} ) => {
        res.render('index', {
          title: 'AEX BOT',
          free: free,
          size: size,
          //hit: data,
          uread: uread,
          tread: tread
        });
      })
    //})
  })
});

router.get('/profile', function (req, res, next) {
  cwa.profile((error, {name, nomor, platform, version, os} = {} ) => {
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

module.exports = router;