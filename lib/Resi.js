var needle = require('needle')

const Resi = (kurir, waybill) => new Promise((resolve, reject) => {
    var url = 'https://api.binderbyte.com/cekresi'
    var result = ''
    const api = ['d4486f8afbb4d91b8ffc8a3a33d7fabedfb74599c8c4366329a2e7aed014b1ba']
    switch (kurir) {
        case 'anteraja':
            needle(url + '?awb=' + waybill + `&api_key=${api[0]}&courier=anteraja`, (err, resp, body) => {
                try {
                    const data = JSON.parse(body)

                    if (data['result'] === true) {
                        const { courier, waybill, process, shipped } = data['data']
                        const { name, date, status } = data['data']['received']

                        result += `
📦 Ekspedisi anteraja
 └ ${courier}

📮 Status
 └ ${status}

📃 Resi
 ├ ${waybill}
 └ ${shipped}

🚧 POD Detail\n`
                        data['data']['tracking'].map(({ date, desc, status }) => {
                            result += `
⏰ ${date}
 └ ${desc} (${status})\n`
                        })
                        resolve(result)
                    } else {
                        reject(`❌ Nomor Resi anteraja ${waybill} tidak ditemukan / info terpending.`)
                    }
                } catch (err) {
                    reject(err)
                }
            })
            break;
        case 'lion':
            needle(url + '?awb=' + waybill + `&api_key=${api[0]}&courier=lion`, (err, resp, body) => {
                try {
                    const data = JSON.parse(body)

                    if (data['result'] === true) {
                        const { courier, waybill, process, shipped } = data['data']
                        const { name, date, status } = data['data']['received']

                        result += `
📦 Ekspedisi Lion Parcel
 └ ${courier}

📮 Status
 └ ${status}

📃 Resi
 ├ ${waybill}
 └ ${shipped}

🚧 POD Detail\n`
                        data['data']['tracking'].map(({ date, desc, status }) => {
                            result += `
⏰ ${date}
 └ ${desc} (${status})\n`
                        })
                        resolve(result)
                    } else {
                        reject(`❌ Nomor Resi Lion Parcel ${waybill} tidak ditemukan / info terpending.`)
                    }
                } catch (err) {
                    reject(err)
                }
            })
            break;
        case 'lex':
            needle(url + '?awb=' + waybill + `&api_key=${api[0]}&courier=lex`, (err, resp, body) => {
                try {
                    const data = JSON.parse(body)

                    if (data['result'] === true) {
                        const { courier, waybill, process, shipped } = data['data']
                        const { name, date, status } = data['data']['received']

                        result += `
📦 Ekspedisi LEX
 └ ${courier}

📮 Status
 └ ${status}

📃 Resi
 ├ ${waybill}
 └ ${shipped}

🚧 POD Detail\n`
                        data['data']['tracking'].map(({ date, desc, status }) => {
                            result += `
⏰ ${date}
 └ ${desc} (${status})\n`
                        })
                        resolve(result)
                    } else {
                        reject(`❌ Nomor Resi LEX ${waybill} tidak ditemukan / info terpending.`)
                    }
                } catch (err) {
                    reject(err)
                }
            })
            break;
        case 'tiki':
            needle(url + '?awb=' + waybill + `&api_key=${api[0]}&courier=tiki`, (err, resp, body) => {
                try {
                    const data = JSON.parse(body)

                    if (data['result'] === true) {
                        const { courier, waybill, process, shipped } = data['data']
                        const { name, date, status } = data['data']['received']

                        result += `
📦 Ekspedisi TIKI
 └ ${courier}

📮 Status
 └ ${status}

📃 Resi
 ├ ${waybill}
 └ ${shipped}

🚧 POD Detail\n`
                        data['data']['tracking'].map(({ date, desc, status }) => {
                            result += `
⏰ ${date}
 └ ${desc} (${status})\n`
                        })
                        resolve(result)
                    } else {
                        reject(`❌ Nomor Resi TIKI ${waybill} tidak ditemukan / info terpending.`)
                    }
                } catch (err) {
                    reject(err)
                }
            })
            break;
        case 'pos':
            needle(url + '?awb=' + waybill + `&api_key=${api[0]}&courier=pos`, (err, resp, body) => {
                try {
                    const data = JSON.parse(body)

                    if (data['result'] === true) {
                        const { courier, waybill, process, shipped } = data['data']
                        const { name, date, status } = data['data']['received']

                        result += `
📦 Ekspedisi POS
 └ ${courier}

📮 Status
 └ ${status}

📃 Resi
 ├ ${waybill}
 └ ${shipped}

🚧 POD Detail\n`
                        data['data']['tracking'].map(({ date, desc, status }) => {
                            result += `
⏰ ${date}
 └ ${desc} (${status})\n`
                        })
                        resolve(result)
                    } else {
                        reject(`❌ Nomor Resi POS ${waybill} tidak ditemukan / info terpending.`)
                    }
                } catch (err) {
                    reject(err)
                }
            })
            break;
        case 'jnt':
            needle(url + '?awb=' + waybill + `&api_key=${api[0]}&courier=jnt`, (err, resp, body) => {
                try {
                    const data = JSON.parse(body)

                    if (data['result'] === true) {
                        const { courier, waybill, process, shipped } = data['data']
                        const { name, date, status } = data['data']['received']

                        result += `
📦 Ekspedisi J&T
 └ ${courier}

📮 Status
 └ ${status}

📃 Resi
 ├ ${waybill}
 └ ${shipped}

🚧 POD Detail\n`
                        data['data']['tracking'].map(({ date, desc, status }) => {
                            result += `
⏰ ${date}
 └ ${desc} (${status})\n`
                        })
                        resolve(result)
                    } else {
                        reject(`❌ Nomor Resi J&T ${waybill} tidak ditemukan / info terpending.`)
                    }
                } catch (err) {
                    reject(err)
                }
            })
            break;
        case 'sicepat':
            needle(url + '?awb=' + waybill + `&api_key=${api[0]}&courier=sicepat`, (err, resp, body) => {
                try {
                    const data = JSON.parse(body)

                    if (data['result'] === true) {
                        const { courier, waybill, process, shipped } = data['data']
                        const { name, date, status } = data['data']['received']

                        result += `
📦 Ekspedisi SICEPAT
 └ ${courier}

📮 Status
 └ ${status}

📃 Resi
 ├ ${waybill}
 └ ${shipped}

🚧 POD Detail\n`
                        data['data']['tracking'].map(({ date, desc, status }) => {
                            result += `
⏰ ${date}
 └ ${desc} (${status})\n`
                        })
                        resolve(result)
                    } else {
                        reject(`❌ Nomor Resi SICEPAT ${waybill} tidak ditemukan / info terpending.`)
                    }
                } catch (err) {
                    reject(err)
                }
            })
            break;
        default:
            break;
    }
})

module.exports = Resi
