var diskSpace = require('check-disk-space')

const Disk = () => new Promise((resolve, reject) => {
  const toGb = (v) => {
    let byteToGb = 1024*1024*1024
    return Number.parseFloat(v/byteToGb).toFixed()
  }
  diskSpace(require('os').homedir())
    .then(disk => {
      resolve({
        free: toGb(disk.free),
        size: toGb(disk.size)
      })
    })
})

module.exports = Disk
