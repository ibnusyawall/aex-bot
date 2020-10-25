var needle = require('needle')
var fs = require('fs')

const Igdl = (link) => new Promise((resolve, reject) => {
   var isLink = link.match(/^https:\/\/www.instagram(?:\.com)/g)

   if (isLink != null) {
     let oku = link.split('/')
     let url = link.indexOf('?') >= 0 ? link.split('/').splice(0, oku.length - 1).join('/') + '/': (link.split('').pop() == '/' != true ? link + '/' : link)
     needle(url + '?__a=1', (err, resp, body) => {
       if (JSON.stringify(body).length < 3) {
          reject(body)
           //reject('account has private mybe.')
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

module.exports = Igdl
