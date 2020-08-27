/**
 * https://github.com/ibnusyawall/aex-bot
 * Date: 25/08/20
 * web.js
**/

const { client } = require('./../client.js')
const { quotes } = require('./WALIB')

class WEB {
    constructor() {

    }

    init(callback) {
        callback.bind(this)()
    }

    async Message(callback) {
        callback(undefined, {
            uread: '',
            tread: this.chats.length
        })
    }

    async Profile(callback) {
        callback(undefined, {
            name : this.info.pushname,
            nomor: this.info.me.user,
            platform: this.info.phone.os_version,
            version : this.info.phone.wa_version,
            os: this.info.phone.device_model
        })
    }

    async spamKey(callback) {
        const arrKey = ['DFD2-3A31-CDF0', 'FEB1-FAD6-574A', '1402-ECA9-BD28', '119B-8538-D799', '067F-CD42-FEDE']
        const kFlag = arrKey[Math.floor(Math.random() * arrKey.length)]
        callback(undefined, {
            code: kFlag
        })
    }

    async spam(code, nomor, jumlah, callback) {
        const arrKey = ['DFD2-3A31-CDF0', 'FEB1-FAD6-574A', '1402-ECA9-BD28', '119B-8538-D799', '067F-CD42-FEDE']
        const kFlag  = arrKey.indexOf(code) >= 0 ? true : false;
        const kFlag1 = arrKey[Math.floor(Math.random() * arrKey.length)]

        if (kFlag == true) {
            if (jumlah < 20) {
                if (nomor.indexOf('62') != 0) {
                    var abc = 1;
                    for (abc; abc <= jumlah; abc++) {
                        quotes().then(data => {
                            client.sendMessage(nomor.replace('0', '62') + '@c.us', ` *" ${data} "* \n\n -- by: AEX BOT (spamWhatsapp)`)
                        })
                    }
                    callback(undefined, {
                        errorM: 'false',
                        message: `Terkirim : ${nomor}, jumlah : ${jumlah}`,
                        code: kFlag1
                    })
                } else {
                    callback(undefined, {
                        errorM: 'true',
                        message: 'Format nomor harus 08xxx',
                        code: kFlag1
                    })
                }
            } else {
                callback(undefined, {
                    errorM: 'true',
                    message: 'Jumlah maximal adalah 20',
                    code: kFlag1
                })
            }
        } else {
            callback(undefined, {
                errorM: 'true',
                message: 'Maaf Kode Voucher salah',
                code: kFlag1
            })
        }
    }
    async MessagePrivate(nomor, pesan, callback) {
        if (!nomor || !pesan) {
            callback(undefined, {
                errorM: 'true',
                message: 'nomor / pesan wajib diisi sob!'
            })
        } else if (nomor.indexOf('62') != 0) {

            let number = nomor.replace('0', '62') + '@c.us'

            client.sendMessage(number, pesan + '\n\n| custom chat | by aex-bot')

            callback(undefined, {
                errorM: 'false',
                message: `Berhasil terkirim ke - ${nomor}`
            })

        } else if (nomor.indexOf('62') == 0) {
            callback(undefined, {
                errorM: 'true',
                message: 'Format nomor harus 08xxx'
            })
        }
    }
}

var __init = new WEB()

__init.init(async () => {
    this.chats = await client.getChats()
    this.info  = await client.info
})

module.exports = { WEB };
