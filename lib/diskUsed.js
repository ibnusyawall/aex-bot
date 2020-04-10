const odiskSpace = require('check-disk-space')

class Disk {
    cdisk(callback) {
        const toGb = (n) => {
            let btoGb = 1024*1024*1024
            return Number.parseFloat(n/btoGb).toFixed()
        }
        odiskSpace('C:/').then((diskSpace) => {
            callback(undefined, {
                free: toGb(diskSpace.free),
                size: toGb(diskSpace.size)
            })
        })
    }
}

module.exports = Disk;