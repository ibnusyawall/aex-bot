const odiskSpace = require('check-disk-space')

class Disk {
    cdisk(callback) {
        const toGb = (n) => {
            let btoGb = 1024*1024*1024
            return Number.parseFloat(n/btoGb).toFixed()
        }
        //odiskSpace('C:/').then((diskSpace) => {
            callback(undefined, {
                free: 'null',//toGb(diskSpace.free),
                size: 'null'//toGb(diskSpace.size)
            })
        //})
    }
}

module.exports = Disk;
