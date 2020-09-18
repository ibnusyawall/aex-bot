var fs = require('fs')

const GetBase64 = (file) => new Promise((resolve, reject) => {
  let result  = fs.readFileSync(file).toString('base64')
  resolve(result)
})

module.exports = { GetBase64 }
