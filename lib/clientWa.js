/**
 * AEX BOT PROJECT
 * Any question or problem ? Contact me!
 * Change Log : add youtube mp3 downloader.
**/

const {
    Client,
    Location,
    GroupChat,
    MessageMedia,
    Chat,
    Message
} = require('whatsapp-web.js');
const SESSION_FILE_PATH = './../session.json';
const { LibBot } = require('./libwa/index')
const { ytDl } = require('./ytdl')
const needle = require('needle')
const ttsId = require('node-gtts')('id')
const ttsEn = require('node-gtts')('en')
const fs = require('fs')
const glob = require('glob')
const qrcode = require('qrcode')
const crypto = require('crypto');
const _ = new LibBot('conn')

let sessionCfg;

if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH);
}
const client = new Client({
  puppeteer: {
    args: [
      "--headless",
      "--log-level=3", // fatal only
      "--start-maximized",
      "--no-default-browser-check",
      "--disable-infobars",
      "--disable-web-security",
      "--disable-site-isolation-trials",
      "--no-experiments",
      "--ignore-gpu-blacklist",
      "--ignore-certificate-errors",
      "--ignore-certificate-errors-spki-list",
      "--disable-gpu",
      "--disable-extensions",
      "--disable-default-apps",
      "--enable-features=NetworkService",
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote"
    ]
  },

client.initialize();

client.on('qr', (qr) => {
    console.log('[:] QR Tersimpan ', qr);
});

client.on('authenticated', (session) => {
    console.log('[:] TERSAMBUNG : ', JSON.stringify(session));
    sessionCfg = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});

client.on('auth_failure', msg => {
    console.error('[:] SAMBUNGAN GAGAL : ', msg);
});

client.on('ready', () => {
    console.log('[:] READY ');
});

client.on('message', async msg => {
    console.log('MESSAGE RECEIVED', msg);
    const chat = await msg.getChat();
    const users = await msg.getContact()
    const dariGC = msg['author']
    const dariPC = msg['from']

    const botTol = () => {
        msg.reply('[!] Maaf, fitur ini hanya untuk admin(owner).')
        return
    }
    const botTol2 = () => {
        msg.reply(`[!] Maaf, fitur ini hanya untuk 'Group Chat'.`)
        return
    }

    if (msg.body.startsWith('!setName ')) {
        if (chat.isGroup) {
            if (dariGC.replace('@c.us', '') == chat.owner.user) {
                let title = msg.body.slice(9)
                chat.setSubject(title)
            } else {
                botTol()
            }
        } else {
            botTol2()
        }
    } else if (msg.body === '!getall') {
        const chat = await msg.getChat();

        let text = "";
        let mentions = [];

        for(let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);

            mentions.push(contact);
            text += `@${participant.id.user} `;
        }

        chat.sendMessage(text, { mentions });
    } else if (msg.body.startsWith('!setDesc ')) {
        if (chat.isGroup) {
            if (dariGC.replace('@c.us', '') == chat.owner.user) {
                let title = msg.body.slice(9)
                chat.setDescription(title)
            } else {
                botTol()
            }
        } else {
            botTol2()
        }
    } else if (msg.body.startsWith('!promote ')) {
        if (chat.isGroup) {
            if (dariGC.replace('@c.us', '') == chat.owner.user) {
                const contact = await msg.getContact();
                const title = msg.mentionedIds[0]
                chat.promoteParticipants([`${title}`])
                // chat.sendMessage(`[:] @${title.replace('@c.us', '')} sekarang anda adalah admin sob 🔥`)
            } else {
                botTol()
            }
        } else {
            botTol2()
        }
    } else if (msg.body.startsWith('!demote ')) {
        if (chat.isGroup) {
            if (dariGC.replace('@c.us', '') == chat.owner.user) {
                let title = msg.mentionedIds[0]
                chat.demoteParticipants([`${title}`])
            } else {
                botTol()
            }
        } else {
            botTol2()
        }
    } else if (msg.body.startsWith('!add ')) {
        if (chat.isGroup) {
            if (dariGC.replace('@c.us', '') == chat.owner.user) {
                let title = msg.body.slice(5)
                if (title.indexOf('62') == -1) {
                    chat.addParticipants([`${title.replace('0', '62')}@c.us`])
                    msg.reply(`[:] Selamat datang @${title}! jangan lupa baca Deskripsi group yah 😎👊🏻`)
                } else {
                    msg.reply('[:] Format nomor harus 0821xxxxxx')
                }
            } else {
                botTol()
            }
        } else {
            botTol2()
        }
    } else if (msg.body.startsWith('!kick ')) {
        if (chat.isGroup) {
            if (dariGC.replace('@c.us', '') == chat.owner.user) {
                let title = msg.mentionedIds
                chat.removeParticipants([...title])
                // console.log([...title]);
            } else {
                botTol()
            }
        } else {
            botTol2()
        }
    } else if (msg.body == '!owner') {
        if (chat.isGroup) {
            msg.reply(JSON.stringify({
                owner: chat.owner.user
            }))
        } else {
            botTol2()
        }
    } else if (msg.body.startsWith('!film ')) {
        let judul = msg.body.slice(6)
        _.cariMovie(judul, (error, {
            data,
            code
        } = {}) => {
            if (code == 200) {
                msg.reply(`📽 BOT AEX CARI FILM 📽\n\n📼 TITLE : ${data[0]['title']}\n\n📼 SYNOPSIS : ${data[0]['synopsis']}\n\n📼 RELEASE: ${data[0]['release']}\n📼 DURASI : ${data[0]['durasi']}\n\n📼 LINK : ${data[0]['link']}`)
            } else {
                msg.reply(data)
            }
        })
    } else if (msg.body == '!quotes') {
        _.quotesView((error, {
            data
        } = {}) => {
            chat.sendMessage(`Quotes request by @${users.number},\n\nQuotes :\n\n " *${data}* " `, {
                mentions: [users]
            })
        })
    } else if (msg.body == '!toxic') {
        _.toxicView((error, {
            data
        } = {}) => {
            client.sendMessage(msg.from, data);
        })
    } else if (msg.body.startsWith('!coronaInfo ')) {
        _.coronaBot(msg.body.slice(12), (error, {
            data,
            negara,
            meninggal,
            positif,
            sembuh
        } = {}) => {
            if (!error) {
                msg.reply(`📢 COVID19 CHECK INFO 📢 \n\n🌡 Name : ${negara}\n🌡 Positif  : ${positif}\n🌡 Sembuh : ${sembuh}\n🌡 Meninggal : ${meninggal}\n\n💌 *SELALU JAGA KESEHATAN DAN BERPOLA HIDUP SEHAT YAH* 😇`)
                return
            } else {
                msg.reply(`📢 COVID19 CHECK INFO 📢 \n\n [!] Masukan nama negara sob!`)
                return
            }
        })
    } else if (msg.body == '!menu' || msg.body == '!help') {
        _.menuBot_((error, {
            data
        } = {}) => {
            client.sendMessage(msg.from, data)
        })
    } else if (msg.body == '!info') {
        _.infoBot_((error, {
            data
        } = {}) => {
            client.sendMessage(msg.from, data)
        })
    } else if (msg.body.startsWith('!tts ')) {
      const dataText   = msg.body.slice(8)
      const decId = (callback) => {
        ttsId.save('./data/resId.mp3', dataText, () => {
          console.log('sukses genearte tts id');
          const fileId = fs.readFileSync('./data/resId.mp3')
          const dataId = fileId.toString('base64')
          console.log(dataId);
          callback(undefined, {
            data: dataId
          })
        })
      }
      const decEn = (callback) => {
        ttsEn.save('./data/resEn.mp3', dataText, () => {
          console.log('sukses genearte tts id');
          const fileEn = fs.readFileSync('./data/resEn.mp3')
          const dataEn = fileEn.toString('base64')
          console.log(dataEn);
          callback(undefined, {
            data: dataEn
          })
        })
      }
      var dataBahasa = msg.body.slice(5, 7)
      if (dataBahasa === 'en') {
        decEn((error, {data} = {}) => {
          msg.reply(new MessageMedia('audio/mp3', data, 'aexbot'))
        })
      } else if (dataBahasa === 'id') {
        decId((error, {data} = {}) => {
          msg.reply(new MessageMedia('audio/mp3', data, 'aexbot'))
        })
      } else {
        msg.reply('masukan bahasa : [en] untuk english, dan [id] untuk indonesia.')
      }
    } else if (msg.body.startsWith('!bot join ')) {
        const inviteCode = msg.body.slice(10).replace('https://chat.whatsapp.com/', '')
        if (msg.body.slice(10).match(/(https:)/gi)) {
            try {
                await client.acceptInvite(inviteCode);
                msg.reply('🍻 Terimakasih, bot akan segera masuk!.');
            } catch (e) {
                msg.reply('🔐 Sepertinya link group telah dibatalkan sob!.');
                console.log(inviteCode)
            }
        } else {
            msg.reply('😎👊 ini link ?')
        }
    } else if (msg.body.startsWith('!qr ')) {
        run().catch(error => console.error(error.stack));
        async function run() {
            const str_ = msg.body.slice(4)
            const res = await qrcode.toDataURL(`${str_}`, {
                errorCorrectionLevel: 'H'
            });
            msg.reply(new MessageMedia('image/jpeg', res.replace('data:image/png;base64,', ''), 'random'))
            console.log(res.replace('data:image/png;base64,', ''))
        }
    } else if (msg.body == '!read qr' && msg.hasMedia) {
        const attachmentData = await msg.downloadMedia();

        fs.writeFile("./data/readQR.jpeg", attachmentData.data, 'base64', (err) => {
            if (err) throw err;
            _.readQR('./data/readQR.jpeg', (error, {
                data
            } = {}) => {
                const pesan = `👋 QR READER AEX BOT 👋 \n\n 🧷 Mime-Type: ${attachmentData.mimetype}\n ------------------------------\n 🧷 DATA RESULT: ${data}`
                _.getBase64(`./data/readQR.jpeg`, (error, {
                    data
                } = {}) => {
                    client.sendMessage(msg.from, new MessageMedia('image/jpeg', data, 'random'), {
                        caption: pesan
                    });
                })

            })
        });
    } else if (msg.body.startsWith('!spam ')) {
        const abc = msg.body.split(' ').length === 4 ? true : false;
        const nmr = msg.body.split(' ')[1]
        const jml = parseInt(msg.body.split(' ')[2])
        const isNum = nmr.indexOf('62') == 0 ? nmr : nmr.replace('0', '62')
        const abx = msg.body.indexOf('!test') == 0 ? true : false;
        const arrKey = ['DFD2-3A31-CDF0', 'FEB1-FAD6-574A', '1402-ECA9-BD28', '119B-8538-D799', '067F-CD42-FEDE']

        if (abc === true) {
            if (arrKey.indexOf(msg.body.split(' ')[3]) >= 0) {
                if (msg.body.split(' ')[2] <= 20) {
                    for (i = 1; i <= jml; i++) {
                        _.quotesView((error, {
                            data
                        } = {}) => {
                            client.sendMessage(`${isNum}@c.us`, `key code : ${i}\n\n *" ${data} "* \n\n -- by: AEX BOT (spamWhatsapp)`)
                        })
                    }
                    msg.reply('[ok] Done Gan.')
                } else {
                    msg.reply(JSON.stringify({
                        error: 'limit jumlah 20'
                    }))
                }
            } else {
                msg.reply(JSON.stringify({
                    error: 'key tidak valid!'
                }))

            }
        } else if (abc == false) {
            msg.reply(`
🗣 Contoh Penggunaan :

!spam <nomor> <jumlah> <key>
     👇🏻
!spam 082299265151 7 ABCD-TFRE-PLOY-QMWS
            `)
        }
    } else if (msg.body == '!spamKey') {
        const arrKey = ['DFD2-3A31-CDF0', 'FEB1-FAD6-574A', '1402-ECA9-BD28', '119B-8538-D799', '067F-CD42-FEDE']
        arrKey.map((key) => {
            msg.reply(`🔐 KEY CODE : ${key} `)
        })
    } else if (msg.body == '!spamHelp') {
        msg.reply(`
🗣 Contoh Penggunaan :

!spam <nomor> <jumlah> <key>
    👇🏻
!spam 082299265151 7 ABCD-TFRE-PLOY-QMWS
         `)
    } else if (msg.body.startsWith('!bs64 ')) {
        if (msg.body.split(' ')[1].match(/enc/g)) {
            _.bs64enc(msg.body.slice(10), (error, {
                data
            } = {}) => {
                msg.reply(`-- bs64 Encode \n\n str: ${msg.body.slice(10)}\n res: ${data}`)
            })
        } else if (msg.body.split(' ')[1].match(/dec/g)) {
            _.bs64dec(msg.body.slice(10), (error, {
                data
            } = {}) => {
                msg.reply(`-- bs64 Decode \n\n str: ${msg.body.slice(10)}\n res: ${data}`)
            })
        } else {
            msg.reply("👋 Sepertinya error, ketik '!help' untuk melihat menu.")
        }
    } else if (msg.body.startsWith('!hash ')) {
        if (msg.body.split(' ')[1].match(/sha1/g)) {
            _.sha1hash(msg.body.slice(11), (error, {
                data
            } = {}) => {
                msg.reply(`-- sha1 Encrypt \n\n str : ${msg.body.slice(11)}\n res : ${data}`)
            })
        } else if (msg.body.split(' ')[1].match(/sha256/g)) {
            _.sha256hash(msg.body.slice(13), (error, {
                data
            } = {}) => {
                msg.reply(`-- sha256 Encrypt \n\n str : ${msg.body.slice(13)}\n res : ${data}`)
            })
        } else if (msg.body.split(' ')[1].match(/sha512/g)) {
            _.sha512hash(msg.body.slice(13), (error, {
                data
            } = {}) => {
                msg.reply(`-- sha512 Encrypt \n\n str : ${msg.body.slice(13)}\n res : ${data}`)
            })
        } else {
            msg.reply("👋 Sepertinya error, ketik '!help' untuk melihat menu.")
        }
    } else if (msg.type == 'call_log') {
        msg.reply(JSON.stringify({
            message: `maaf, bot tidak dapat menjawab telepon.`
        }))
    } else if (msg.body.startsWith('!ytdl ')) {
      const ytdl = new ytDl()
      ytdl.mp3(msg.body.slice(6), (error, {
        link
      } = {}) => {
        const dataFile = fs.createWriteStream('aex-bot|ytdl.mp3')
        needle.get(link).pipe(dataFile).on('finish', () => {
          const file = fs.readFileSync('./aex-bot|ytdl.mp3').toString('base64')
          msg.reply('harap tunggu, file sedang diproses dan akan segera dikirimkan.')
          msg.reply(new MessageMedia('audio/mp3', file, 'aexbot'))
        })
      })
    }
})

class clientWa {
    async tuMessage(callback) {
        const chats = await client.getChats();
        callback(undefined, {
            uread: 'fff',
            tread: chats.length
        })
    }
    async profile(callback) {
        const info = await client.info;
        callback(undefined, {
            name: info.pushname,
            nomor: info.me.user,
            platform: info.phone.os_version,
            version: info.phone.wa_version,
            os: info.phone.device_model
        })
        console.log(info.phone)
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
        const kFlag = arrKey.indexOf(code) >= 0 ? true : false;
        const kFlag1 = arrKey[Math.floor(Math.random() * arrKey.length)]

        console.log(kFlag)
        if (kFlag == true) {
            if (jumlah < 20) {
                if (nomor.indexOf('62') != 0) {
                    var abc = 1;
                    for (abc; abc <= jumlah; abc++) {
                        _.quotesView((error, {
                            data
                        } = {}) => {
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
    async cchat(nomor, pesan, callback) {
        if (!nomor || !pesan) {
            callback(undefined, {
                errorM: 'true',
                message: 'nomor / pesan wajib diisi sob!'
            })
        } else if (nomor.indexOf('62') != 0) {

            let nomore = nomor.replace('0', '62') + '@c.us'
            client.sendMessage(nomore, pesan + '\n\n| custom chat | by aex-bot')
            callback(undefined, {
                errorM: 'false',
                message: `Berhasil terkirim ke - ${nomor}`
            })
            //  }
        } else if (nomor.indexOf('62') == 0) {
            callback(undefined, {
                errorM: 'true',
                message: 'Format nomor harus 08xxx'
            })
        }
    }
}

module.exports = clientWa;
