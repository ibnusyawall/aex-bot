/**
 * https://github.com/ibnusyawall/aex-bot
 * Date: 11/09/20
 * client.js
**/

const {
    Client,
    Location,
    GroupChat,
    MessageMedia,
    Chat,
    Message
} = require('whatsapp-web.js')
const {
    menu,
    about,
    quotes,
    toxic,
    getBase64,
    qrMaker,
    ytdL,
    tts,
    generateQuotesDefault,
    generateQuotes,
    jadwalSholat,
    igdl,
    wikipedia,
    primbon,
    cekresi,
    random_anim_hentai
} = require('./lib/WALIB')

const SESSION_FILE_PATH = process.cwd() + '/session.json'
const needle   = require('needle')
const moment   = require('moment-timezone')
const qrcode   = require('qrcode-terminal')
const fs = require('fs')

var tanggal  = moment.tz('Asia/Jakarta').format('DD-MM-YYYY')

let sessionCfg;

if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH)
}

let pathChrome = {
    executablePath: '',
}

const os = require('os').platform()

if (os === 'linux') {
    pathChrome.executablePath = '/usr/bin/chromium'
} else if (os === 'win32' || os === 'win64') {
    pathChrome.executablePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
} else if (os === 'darwin') {
    pathChrome.executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
}

const client = new Client({
    puppeteer: {
        headless: true,
        args: [
            "--disable-extensions",
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--disable-accelerated-2d-canvas",
            "--no-zygote",
            '--aggressive-cache-discard',
            '--disable-cache',
            '--disable-application-cache',
            '--disable-offline-load-stale-cache',
            '--disk-cache-size=0'
        ],
        executablePath: pathChrome.executablePath
    },
    session: sessionCfg
})

const run = async () => {
    client.initialize()

    client.on('qr', (qr) => {
        qrcode.generate(qr, {small: true})
    })

    client.on('authenticated', (session) => {
        console.log('[:] TERSAMBUNG : ', JSON.stringify(session));
        sessionCfg = session;
        fs.writeFileSync(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
            if (err) throw err;
            console.log(`[√] Qr Tersimpan: ${SESSION_FILE_PATH}`)
        })
    })

    client.on('auth_failure', msg => {
        console.error('[:] SAMBUNGAN GAGAL : ', msg);
    })

    client.on('ready', () => {
        console.log('[:] READY ');
    })

    client.on('message', async msg => {
        EventHandler(client, msg)
    })

    client.on('group_join', async notification => {
        client.sendMessage(notification.id.remote, `Wellcome to Group!\n\nJangan lupa baca deskripsi group terlebih dahulu, dan semoga betah.\n\n-- wellcome-group by: aex-bot`)
    })
}

const EventHandler = async (client_, msg_) => {
    try {
        const chat  = await msg_.getChat()
        const users = await msg_.getContact()
        const { type, from, to, author, timestamp, mentionedIds } = msg_
        let { body } = msg_

        function replace(text) {
            return text.replace('@c.us', '')
        }

        const dari = typeof author === 'undefined' ? from : author
        const prefix = '!'

        const istimer = (ts) => moment.duration(moment() - moment(timestamp * 1000)).asSeconds()

        const args   = body.slice(prefix.length).trim().split(/ +/);
        const argv   = body.slice(prefix.length).trim().split(/ +/);
        const text   = args.splice(1).join(' ')
        const number = text.indexOf('62') === -1 ? text.replace('0', '62') + '@c.us' : text
        const krisarNumber = '6282299265151@c.us'  // pliese don't delete this variable.

        switch (args[0]) {
                case 'setName':
                    if (chat.isGroup) {
                        if (replace(author) === chat.owner.user) chat.setSubject(text)
                    }
                    break;
                case 'setDesc':
                    if (chat.isGroup) {
                        if (replace(author) === chat.owner.user) chat.setDescription(text)
                    }
                    break;
                case 'promote':
                    if (chat.isGroup) {
                        if (replace(author) === chat.owner.user) chat.promoteParticipants([mentionedIds[0]])
                    }
                    break;
                case 'demote':
                    if (chat.isGroup) {
                        if (replace(author) === chat.owner.user) chat.demoteParticipants([mentionedIds[0]])
                    }
                    break;
                case 'add':
                    if (chat.isGroup) {
                        if (replace(author) === chat.owner.user) chat.addParticipants([number])
                    }
                    break;
                case 'kick':
                    if (chat.isGroup) {
                        if (replace(author) === chat.owner.user) chat.removeParticipants([...mentionedIds])
                    }
                    break;
                case 'kickme':
                    if (chat.isGroup) {
                        if (replace(author) === chat.owner.user) chat.leave()
                    }
                    break;
                case 'kickall':
                    if (chat.isGroup) {
                        if (replace(author) === chat.owner.user) {
                            let text = "";
                            let mentions = [];

                            for(let participant of chat.participants) {
                                const contact = await client_.getContactById(participant.id._serialized);

                                mentions.push(contact);
                                text += `@${participant.id.user} `;
                            }
                            chat.removeParticipants(mentions)
                        }
                    }
                    break;
                case 'owner':
                    if (chat.isGroup) {
                        client_.sendMessage(from, `owner this group: ${chat.owner.user}`)
                    }
                    break;
                case 'getall':
                    if (chat.isGroup) {
                        let text = "";
                        let mentions = [];

                        for(let participant of chat.participants) {
                            const contact = await client.getContactById(participant.id._serialized);

                            mentions.push(contact);
                            text += `@${participant.id.user} `;
                        }

                        chat.sendMessage(text, { mentions });
                    }
                    break;
                case 'menu':
                    menu().then(menu => {
                        console.log(menu)
                        client_.sendMessage(from, menu)
                    })
                    break;
                case 'info':
                    about().then(info => {
                        client_.sendMessage(from, info)
                    })
                    break;
                case 'quotes':
                    quotes().then(quotes => {
                        chat.sendMessage(`Quotes request by @${users.number},\n\nQuotes :\n\n " *${quotes}* " `, {
                            mentions: [users]
                        })
                    })
                    break;
                case 'toxic':
                    toxic().then(toxic => {
                        client_.sendMessage(from, toxic)
                    })
                    break;
                case 'qr':
                    qrMaker(text).then(result => {
                        msg_.reply(new MessageMedia('image/jpeg', result, 'qrcode'))
                    })
                    break;
                case 'quotesmaker':
                    const attachmentData = await msg_.downloadMedia()

                    if (!argv[1] || !argv[2] || !argv[3]) msg_.reply('argv invalid.')

                    if (type == 'image') {
                        fs.writeFile(process.cwd() + '/quotesClient.jpg', attachmentData.data, 'base64', (err) => {
                            try {
                                generateQuotes(process.cwd() + '/quotesClient.jpg', argv[1], argv[2], argv.splice(3).join(' '))
                                  .then(data => {
                                      msg_.reply(new MessageMedia('image/jpeg', data, 'quotes'))
                                  })
                            } catch (err) {
                                client_.sendMessage(from, 'error parse data.')
                            }
                        })
                    } else {
                        generateQuotesDefault(argv[1], argv[2], argv.splice(3).join(' ')).then(data => {
                            msg_.reply(new MessageMedia('image/jpeg', data, 'quotes'))
                        })
                    }
                    break;
                case 'tts':
                    switch (argv[1]) {
                        case 'id':
                            tts('id', argv.splice(2).join(' ')).then(data => {
                                msg_.reply(new MessageMedia('audio/mp3', data, 'tts'))
                            })
                            break;
                        case 'en':
                            tts('en', argv.splice(2).join(' ')).then(data => {
                                msg_.reply(new MessageMedia('audio/mp3', data, 'tts'))
                            })
                            break;
                        default:
                            client_.sendMessage(from, 'piilih bahasa: \n\n*id* untuk bahasa indonesia \n*en* untuk bahasa inggris')
                            break;
                    }
                    break;
                case 'ytmp3':
                    let isLink = text.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);

                    if (isLink !== null) {
                        msg_.reply('File akan segera kami proses, harap bersabar.')
                        ytdL('mp3', text).then(data => {
                            data.map(({ audiobase64 }) => {
                                msg_.reply(new MessageMedia('audio/mp3', audiobase64, 'ytmp3'))
                            })
                        })
                    } else {
                        msg_.reply('link atau url tidak valid.')
                    }
                    break;
                case 'ytmp4':
                    let isLinks = text.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);

                    if (isLinks !== null) {
                        msg_.reply('File akan segera kami proses, harap bersabar.')
                        ytdL('mp4', text).then(data => {
                            data.map(({ title, duration, videobase64 }) => {
                              let ytmp4 = `YT MP4 DOWNLOADER\n\n*${title}* [${duration}]\n\nTiming: ${istimer()}`

                              client_.sendMessage(from, new MessageMedia('video/mp4', videobase64, 'ytmp4'), {
                                  caption: ytmp4
                              })
                            })
                        })
                    } else {
                        msg_.reply('link atau url tidak valid.')
                    }
                    break;
                case 'botjoin':
                    const inviteCode = argv[1].replace('https://chat.whatsapp.com/', '')
                    if (argv[1].match(/(https:)/gi)) {
                        try {
                            await client_.acceptInvite(inviteCode);
                            msg_.reply('🍻 Terimakasih, bot akan segera masuk!.');
                        } catch (e) {
                            msg_.reply('🔐 Sepertinya link group telah dibatalkan sob!.');
                        }
                    } else {
                       msg_.reply('😎👊 ini link ?')
                    }
                    break;
                case 'js':
                    jadwalSholat(text)
                    .then(data => {
                        data.map(({isya, subuh, dzuhur, ashar, maghrib, terbit}) => {
                            var x  = subuh.split(':'); y = terbit.split(':')
                            var xy = x[0] - y[0]; yx = x[1] - y[1]
                            let perbandingan = `${xy < 0 ? Math.abs(xy) : xy}jam ${yx< 0 ? Math.abs(yx) : yx}menit`
                            let msg = `Jadwal Sholat untuk ${text} dan Sekitarnya ( *${tanggal}* )\n\nDzuhur : ${dzuhur}\nAshar  : ${ashar}\nMaghrib: ${maghrib}\nIsya       : ${isya}\nSubuh   : ${subuh}\n\nDiperkirakan matahari akan terbit pada pukul ${terbit} dengan jeda dari subuh sekitar ${perbandingan}\n\n\nFetch from: https://api.banghasan.com/`
                            msg_.reply(msg)
                        })
                    })
                    .catch(err => msg_.reply(err))
                    break;

                case 'igdl':
                    igdl(text)
                        .then(resp => {
                            const { author, type, like, link, data } = resp
                            if (type == 'image') {
                                let msg = `IG IMAGE DOWNLOADER by (aex-bot)\n\n${author} [${like} likes]\n\nLink: ${link}`

                                client_.sendMessage(from, new MessageMedia('image/jpeg', data, 'aex-bot'), {
                                    caption: msg
                                })
                            } else {
                                let msg = `IG VIDEO DOWNLOADER by (aex-bot)\n\n${author} [${like} likes]\n\nLink: ${link}`

                                client_.sendMessage(from, new MessageMedia('video/mp4', data, 'aex-bot'), {
                                    caption: msg
                                })
                            }
                        }).catch(err => msg_.reply(err))
                    break;
                case 'wiki':
                    wikipedia(text).then(data => msg_.reply(data.data)).catch(err => msg_.reply(err))
                    break;
                case 'sial':
                    primbon('sial', text).then(resp => {
                        const { title, data } = resp

                        msg_.reply(`${title}\n\n${data}`)
                    })
                    break;
                case 'jodoh':
                    primbon('jodoh', text).then(resp => {
                        const { title, data } = resp

                        msg_.reply(`${title}\n\n${data}`)
                    })
                    break;
                case 'artinama':
                    primbon('artinama', text).then(resp => {
                        const { title, data } = resp

                        msg_.reply(`${title}\n\n${data}`)
                    })
                    break;
                case 'sifat':
                    primbon('sifat', text).then(resp => {
                        const { title, data } = resp

                        msg_.reply(`${title}\n\n${data}`)
                    })
                    break;
                case 'jnt':
                    cekresi('jnt', text).then(data => {
                        msg_.reply(data)
                    }).catch((err) => {
                        msg_.reply(err)
                    })
                    break;
                case 'lex':
                    cekresi('lex', text).then(data => {
                        msg_.reply(data)
                    }).catch((err) => {
                        msg_.reply(err)
                    })
                    break;
                case 'lion':
                    cekresi('lion', text).then(data => {
                        msg_.reply(data)
                    }).catch((err) => {
                        msg_.reply(err)
                    })
                    break;
                case 'sicepat':
                    cekresi('sicepat', text).then(data => {
                        msg_.reply(data)
                    }).catch((err) => {
                        msg_.reply(err)
                    })
                    break;
                case 'pos':
                    cekresi('pos', text).then(data => {
                        msg_.reply(data)
                    }).catch((err) => {
                        msg_.reply(err)
                    })
                    break;
                case 'tiki':
                    cekresi('tiki', text).then(data => {
                        msg_.reply(data)
                    }).catch((err) => {
                        msg_.reply(err)
                    })
                    break;
                case 'anteraja':
                    cekresi('anteraja', text).then(data => {
                        msg_.reply(data)
                    }).catch((err) => {
                        msg_.reply(err)
                    })
                    break;
                case 'randomnime':
                    random_anim_hentai('anim').then(data => {
                        msg_.reply(new MessageMedia('image/jpeg', data.data, 'aex-bot'))
                    })
                    break;
                case 'randomhentai':
                    random_anim_hentai('hentai').then(data => {
                        msg_.reply(new MessageMedia('image/jpeg', data.data, 'aex-bot'))
                    })
                    break;
                case 'krisar':
                    client_.sendMessage(from, 'kritik dan saran dikirimkan.')
                    client_.sendMessage(krisarNumber, `[krisar] From: ${from}\n\n${text}`)
                    break;
                case 'ping':
                    client_.sendMessage(from, `Pong! ⏳ ${istimer()}s`)
                    break;
        }
        console.log(msg_, users)
    } catch (err) {
        console.log(err)
    }
}

( async () => {
    run()
})()


module.exports = {
    client
}
