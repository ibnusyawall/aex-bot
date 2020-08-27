/**
 * https://github.com/ibnusyawall/aex-bot
 * Date: 28/08/20
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
    readQR,
    ytDlMP3,
    tts,
    generateQuotesDefault,
    generateQuotes
} = require('./lib/WALIB')

const SESSION_FILE_PATH = process.cwd() + '/session.json'
const needle = require('needle')
const qrcode = require('qrcode-terminal')
const fs = require('fs')

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
        const { type, from, to, author, mentionedIds } = msg_
        let { body } = msg_

        function replace(text) {
            return text.replace('@c.us', '')
        }

        const dari = typeof author === 'undefined' ? from : author
        const prefix = '!'

        const args   = body.slice(prefix.length).trim().split(/ +/);
        const argv   = body.slice(prefix.length).trim().split(/ +/);
        const text   = args.splice(1).join(' ')
        const number = text.indexOf('62') === -1 ? text.replace('0', '62') + '@c.us' : text

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
                case 'owner':
                    if (chat.isGroup) {
                        client_.sendMessage(from, `owner this group: ${chat.owner.user}`)
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
                    let isLink = text.match(/^https:\/\/youtu(?:\.be|be\.com)/g)

                    if (isLink !== null) {
                        ytDlMP3(text).then(data => {
                            msg_.reply(new MessageMedia('audio/mp3', data, 'aexbot'))
                        })
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
