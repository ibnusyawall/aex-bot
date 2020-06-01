/**
   youtube downloader v0.0.1 by aex-bot 
   01/06/20
*/

const needle = require('needle')
const fs  = require('fs')
const superagent = require('superagent')
const html2json  = require('html-to-json')

const _getId = (link, callback) => {
  superagent.post('https://mate12.y2mate.com/mp3/ajax').send({
    url: link,
    ajax: '1',
  }).set('content-type', 'application/x-www-form-urlencoded; charset=UTF-8').end((err, res) => {
    if (err) throw err;
    const data = JSON.parse(res.text)
    const html = data.result
    const _id_ = html.indexOf('_id:')
    const _vid = html.indexOf('v_id:')
    const __id = html.slice(_id_, _id_+31).split(' ')[1]
    const __vid= html.slice(_vid, _vid+19).split(' ')[1]
    callback(undefined, {
      id: __id.replace(/[\']/gi, ""),
      vid: __vid.replace(/[\']/gi, "")
    })
  })
}

class ytDl {
  mp3(l, callback) {
    _getId(l, (error, {id, vid} = {}) => {
      superagent.post('https://mate06.y2mate.com/mp3Convert').send({
        type: 'youtube',
        _id: `${id}`,
        v_id: `${vid}`,
        mp3_type: '128'
      }).set('content-type', 'application/x-www-form-urlencoded; charset=UTF-8').end((err, res) => {
        if (err) throw err;
        const data = JSON.parse(res.text)
        const html = data.result
        html2json.parse(`${html}`, {
          'link': ['a', (alink) => {
            return alink.attr('href')
          }]
        }, (err, result) => {
          if (err) throw err
          callback(undefined, {
            link: result['link']['0']
          })
        })
      })
    })
  }
}

module.exports = ytDl


// debugging example
// new ytDl().mp3('https://youtu.be/KSoI_Vq5S3g', (error, {link} = {}) => {
//   console.log(link)
// })
