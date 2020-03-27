/*const fs = require('fs');
const qrcode = require('qrcode');

let res;

const promise = qrcode.toDataURL('https://github.com/ibnusyawall').then(res => { str = res.substr(0, 25) })

console.log(promise)


run().catch(error => console.error(error.stack));

async function run() {
  const res = await qrcode.toDataURL('http://asyncawait.net');

  fs.writeFileSync('./qr.html', `<img src="${res}">`);
  console.log('Wrote to ./qr.html');
  console.log(res)
}
*/


const QRReader = require('qrcode-reader');
const fs = require('fs');
const jimp = require('jimp');

run().catch(error => console.error(error.stack));

async function run() {
  const img = await jimp.read(fs.readFileSync('./out.jpeg'));
  //console.log(img.getBase64Async('image/jpeg'))

  const qr = new QRReader();

  // qrcode-reader's API doesn't support promises, so wrap it
  const value = await new Promise((resolve, reject) => {
    qr.callback = (err, v) => err != null ? reject(err) : resolve(v);
    qr.decode(img.bitmap);
  });

  // { result: 'http://asyncawait.net',
  //   points:
  //     [ FinderPattern {
  //         x: 68.5,
  //         y: 252,
  //         count: 10,
  // ...
 // console.log(value);

  // http://asyncawait.net
  console.log(value.result);
}
