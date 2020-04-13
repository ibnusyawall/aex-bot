const dDisk  = require('./diskUsed')
const cdDisk = new dDisk()

cdDisk.cdisk((error, {free, size} = {} ) => {
  console.log(free)
})
