var Datastore = require('nedb'),
    db = new Datastore({ filename: process.cwd() + '/.database.db' })

db.loadDatabase(err => { if (err) throw err; console.log('[:] Database loaded.') })

const insert = (no, type, text, name, from, command) => new Promise((resolve, reject) => {
    let data = {
        no: no,
        date: new Date(),
        type: type,
        details: {
            text: text,
            name: name,
            from: from,
            command: command
        }
    }
    db.insert(data, async (err, resp) => {
        try {
            resolve('ok')
        } catch (err) {
            reject(err)
        }
    })
})

const countHit = new Promise((resolve, reject) => {
    db.count({}, async (err, resp) => {
        try {
            resolve(resp)
        } catch (err) {
            reject(err)
        }
    })
})

const countUsers = (from) => new Promise((resolve, reject) => {
    db.count({ "details.from": from }, async (err, resp) => {
        try {
            resolve(resp)
        } catch (err) {
            reject(err)
        }
    })
})

const statCommand = (command) => new Promise((resolve, reject) => {
    db.count({ "details.command": command }, async (err, resp) => {
        try {
            resolve(resp)
        } catch (err) {
            reject(err)
        }
    })
})


module.exports = {
    insert,
    countHit,
    countUsers,
    statCommand
}
