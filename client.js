/**
  * https://github.com/ibnusyawall/aex-bot
  * Date: 18/09/20
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

const { MessageHandler }= require('./handler/message/index')

const SESSION_FILE_PATH = process.cwd() + '/session.json'
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
    pathChrome.executablePath = '/usr/bin/chromium' || '/usr/bin/chromium-browser' || '/usr/bin/google-chrome-stable'
} else if (os === 'win32' || os === 'win64') {
    pathChrome.executablePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe' || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
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
        MessageHandler(client, msg)
    })

    client.on('group_join', async notification => {
        client.sendMessage(notification.id.remote, `Wellcome to Group!\n\nJangan lupa baca deskripsi group terlebih dahulu, dan semoga betah.\n\n-- wellcome-group by: aex-bot`)
    })
}

( async () => {
    run()
})()


module.exports = {
    client
}
