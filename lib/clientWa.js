// koneksi bot whatsapp
const {
    Client,
    Location,
    GroupChat,
    MessageMedia,
    Chat,
    Message
} = require('./libwa/index');
const SESSION_FILE_PATH = './../session.json';
const {
    LibBot
} = require('./libwa/lib/index')
const fs = require('fs')
const glob = require('glob')
const _ = new LibBot('conn')
const shell = require('shelljs')
const qrcode = require('qrcode')

let sessionCfg;

if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH);
}

client = new Client({
    puppeteer: {
        headless: false
    },
    session: sessionCfg
});

client.initialize();

// generate qrcode
client.on('qr', (qr) => {
    console.log('[:] QR Tersimpan ', qr);
});

// generate session chromium
client.on('authenticated', (session) => {
    console.log('[:] TERSAMBUNG : ', session['WABrowserId']);
    sessionCfg = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});

// bila koneksi gagal
client.on('auth_failure', msg => {
    console.error('[:] SAMBUNGAN GAGAL : ', msg);
});
// bila koneksi berhasil 
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
            if (dariGC == chat.owner.user) {
                let title = msg.body.slice(9)
                chat.setSubject(title)
            } else {
                botTol()
            }
        } else {
            botTol2()
        }
    } else if (msg.body.startsWith('!setDesc ')) {
        if (chat.isGroup) {
            if (dariGC == chat.owner.user) {
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
            if (dariGC == chat.owner.user) {
                const contact = await msg.getContact();
                const title = msg.mentionedIds[0]
                chat.promoteParticipants([`${title}`])
                chat.sendMessage(`[:] @${title.replace('@c.us', '')} sekarang anda adalah admin sob 🔥`)
            } else {
                botTol()
            }
        } else {
            botTol2()
        }
    } else if (msg.body.startsWith('!demote ')) {
        if (chat.isGroup) {
            if (dariGC == chat.owner.user) {
                let title = msg.mentionedIds[0]
                chat.demoteParticipants([`${title}`])
                msg.reply(`[:] @${title.replace('@c.us', '')} anda bukan lagi admin 🤒`)
                // record hit
                _.hitUser(dari, (error, {
                    data
                } = {}) => {
                    console.log('[:] user record ..')
                })
            } else {
                botTol()
            }
        } else {
            botTol2()
        }
    } else if (msg.body.startsWith('!add ')) {
        if (chat.isGroup) {
            if (dariGC == chat.owner.user) {
                let title = msg.body.slice(5)
                chat.addParticipants([`${title}@c.us`])
                msg.reply(`[:] Selamat datang @${title}! jangan lupa baca Deskripsi group yah 😎👊🏻`)
                // record hit
                _.hitUser(dari, (error, {
                    data
                } = {}) => {
                    console.log('[:] user record ..')
                })
            } else {
                botTol()
            }
        } else {
            botTol2()
        }
    } else if (msg.body.startsWith('!kick ')) {
        if (chat.isGroup) {
            if (dariGC == chat.owner.user) {
                let title = msg.mentionedIds[0]
                chat.removeParticipants([`${title}`])
                msg.reply(`[:] @${title.replace('@c.us', '')} kamu dipentung 😭👊🏻`)
                // record hit
                _.hitUser(dari, (error, {
                    data
                } = {}) => {
                    console.log('[:] user record ..')
                })
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
                msg.reply(`📢 COVID19 CHECK INFO 📢 \n\n🌡 Negara : ${negara}\n🌡 Positif  : ${positif}\n🌡 Sembuh : ${sembuh}\n🌡 Meninggal : ${meninggal}\n\n💌 *SELALU JAGA KESEHATAN DAN BERPOLA HIDUP SEHAT YAH* 😇`)
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
        _.tts(msg.body.slice(5), (error, {
            data
        } = {}) => {
            msg.reply(new MessageMedia('audio/mp3', data, 'aexbot'))
        })
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

        fs.writeFile("lib/libwa/data/out.jpeg", attachmentData.data, 'base64', (err) => {
            if (err) throw err;
            _.readQR('lib/libwa/data/out.jpeg', (error, {
                data
            } = {}) => {
                const pesan = `👋 QR READER AEX BOT 👋 \n\n 🧷 Mime-Type: ${attachmentData.mimetype}\n ------------------------------\n 🧷 DATA RESULT: ${data}`
                _.getBase64(`lib/libwa/data/out.png`, (error, {
                    data
                } = {}) => {
                    //msg.reply(new MessageMedia('image/jpeg', data, 'random'))
                    client.sendMessage(msg.from, new MessageMedia('image/jpeg', data, 'random'), {
                        caption: pesan
                    });
                })

            })
        });
    } else if (msg.body.startsWith('!spam ')) {
        if (msg.hasMedia) {
            const nmr = msg.body.split(' ')[1] + '@c.us'
            //  const psn = `\n\n ----------\n send by: ${msg.}`
            const del = msg.body.split(' ')[2]
            const media = await msg.downloadMedia()

            fs.writeFile('lib/libwa/data/spam.jpeg', media.data, 'base64', (err) => {
                if (err) throw err;
                _.spamWaBot('lib/libwa/data/spam.jpeg', (error, {
                    ok,
                    key
                } = {}) => {
                    if (ok != 'failed') {
                        if (del >= 21) {
                            msg.reply(JSON.stringify({
                                error: 'limit jumlah 20'
                            }))
                        } else if (nmr.indexOf('62') != 0) {
                            for (abc = 1; abc <= del; abc++) {
                                _.quotesView((error, {
                                    data
                                } = {}) => {
                                    client.sendMessage(nmr.replace('0', '62'), `key code : ${abc}\n\n *" ${data} "* \n\n -- by: AEX BOT (spamWhatsapp)`)
                                })
                            }
                            msg.reply(JSON.stringify({
                                error: 'false',
                                nomor: nmr.replace('@c.us', ''),
                                jumlah: del
                            }))
                            //}
                        } else {
                            msg.reply(JSON.stringify({
                                message: 'format nomor : 0822xxx'
                            }))
                        }
                    } else {
                        _.getBase64('lib/libwa/data/spam.jpeg', (error, {
                            data
                        } = {}) => {
                            client.sendMessage(msg.from, new MessageMedia('image/jpeg', data, 'random'), {
                                caption: JSON.stringify({
                                    error: 'true',
                                    flag: key,
                                    message: 'key tidak valid!'
                                })
                            })
                        })
                    }
                })
            })
        } else {
            msg.reply(JSON.stringify({
                error: 'true',
                message: 'auth tidak valid.'
            }))
        }
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
    } else if (dariPC.indexOf('@c.us') != -1) {
        msg.reply(JSON.stringify({
            message: `ketik '!help untuk melihat menu'`
        }))
    } else if (msg.body == '!test') {
        let info = client.info;
        let ar = client.archiveChat()
        client.sendMessage(msg.from, `
            *Connection info*
            User name: ${info.pushname}
            My number: ${info.me.user}
            Platform: ${info.platform}
            WhatsApp version: ${info.phone.wa_version},
            test: ${ar}
        `);
    }
})

class clientWa {
    async tuMessage(callback) {
        const chats = await client.getChats();
        //const _msg = new Message()
        //const msg = await _msg.getChat()
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
}

module.exports = clientWa;