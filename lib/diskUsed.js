/**
 * AEX BOT PROJECT
 * Any question or problem ? Contact me!
 * Change Log : send media has been fixed.
**/

const odiskSpace = require('check-disk-space')
const os = require('os')

class Disk {
    cdisk(callback) {
        const toGb = (n) => {
            let btoGb = 1024*1024*1024
            return Number.parseFloat(n/btoGb).toFixed()
        }
        odiskSpace(os.homedir()).then((diskSpace) => {
            callback(undefined, {
                free: toGb(diskSpace.free),
                size: toGb(diskSpace.size)
            })
        })
    }
}

module.exports = Disk;
