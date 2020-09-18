const groupList = (prefix) => new Promise((resolve, reject) => {
    resolve(
      [
        {
            command: `📝 ${prefix} *setName*`,
            description: `└ contoh: ${prefix}setName AEX BOT GROUP`
        },
        {
            command: `📝 ${prefix} *setDesc*`,
            description: `└ contoh: ${prefix}setDesc Deskripsi Group`
        },
        {
            command: `📝 ${prefix} *demote*`,
            description: `└ contoh: ${prefix}demote @tagmember`
        },
        {
            command: `📝 ${prefix} *promote*`,
            description: `└ contoh: ${prefix}promote @tagmember`
        },
        {
            command: `📝 ${prefix} *kick*`,
            description: `└ contoh: ${prefix}kick @tagmember`
        },
        {
            command: `📝 ${prefix} *add*`,
            description: `└ contoh: ${prefix}add 082299265151`
        },
        {
            command: `📝 ${prefix} *kickme*`,
            description: `└ deskripsi: mengeluarkan bot ini dari group.`
        },
        {
            command: `📝 ${prefix} *kickall*`,
            description: `└ deskripsi: mengeluarkan semua member dari group.`
        },
        {
            command: `📝 ${prefix} *getall*`,
            description: `└ deskripsi: men-tag semua member dalam group.`
        },
        {
            command: `📝 ${prefix} *owner*`,
            description: `└ deskripsi: melihat siapa owner group.`
        }
      ]
    )
})

const otherList = (prefix) => new Promise((resolve, reject) => {
    resolve(
      [
        {
            command: `📝 ${prefix} *botjoin*`,
            description: `└ contoh: ${prefix}botjoin https://chat.whatsapp.com/DBHTdnFW7bD45FwfdIGZHI`
        },
        {
            command: `📝 ${prefix} *igdl*`,
            description: `└ contoh: ${prefix}igdl https://www.instagram.com/p/B78XGjtAj_8/`
        },
        {
            command: `📝 ${prefix} *ytmp3*`,
            description: `└ contoh: ${prefix}ytmp3 https://youtu.be/0Xb0xhEz-68`
        },
        {
            command: `📝 ${prefix} *ytmp4*`,
            description: `└ contoh: ${prefix}ytmp4 https://youtu.be/0Xb0xhEz-68`
        },
        {
            command: `📝 ${prefix} *qr*`,
            description: `└ contoh: ${prefix}qr membuat qrcode`
        },
        {
            command: `📝 ${prefix} *tts*`,
            description: `└ contoh: ${prefix}tts id text-to-speech`
        },
        {
            command: `📝 ${prefix} *brainly*`,
            description: `└ contoh: ${prefix}brainly kapan hari kemerdekaan indonesia`
        },
        {
            command: `📝 ${prefix} *js*`,
            description: `└ contoh: ${prefix}js Bogor`
        },
        {
            command: `📝 ${prefix} *wiki*`,
            description: `└ contoh: ${prefix}wiki PHP`
        },
        {
            command: `📝 ${prefix} *quotesmaker*`,
            description: `└ contoh: ${prefix}quotesmaker i don't know why`
        },
        {
            command: `📝 ${prefix} *sial*`,
            description: `└ contoh: ${prefix}sial 24/12/2002`
        },
        {
            command: `📝 ${prefix} *artinama*`,
            description: `└ contoh: ${prefix}artinama young lex`
        },
        {
            command: `📝 ${prefix} *jodoh*`,
            description: `└ contoh: ${prefix}jodoh aku & kamu`
        },
        {
            command: `📝 ${prefix} *sifat*`,
            description: `└ contoh: ${prefix}sifat Yusuf 24/12/2002`
        },
        {
            command: `📝 ${prefix} *jnt*`,
            description: `└ contoh: ${prefix}jnt JNT12345678`
        },
        {
            command: `📝 ${prefix} *lex*`,
            description: `└ contoh: ${prefix}lex LEX12345678`
        },
        {
            command: `📝 ${prefix} *pos*`,
            description: `└ contoh: ${prefix}pos PO512345678`
        },
        {
            command: `📝 ${prefix} *lion*`,
            description: `└ contoh: ${prefix}lion L10N345678`
        },
        {
            command: `📝 ${prefix} *tiki*`,
            description: `└ contoh: ${prefix}tiki T1K1345678`
        },
        {
            command: `📝 ${prefix} *sicepat*`,
            description: `└ contoh: ${prefix}sicepat S1C345678`
        },
        {
            command: `📝 ${prefix} *anteraja*`,
            description: `└ contoh: ${prefix}anteraja A2345678`
        },

        {
            command: `📝 ${prefix} *quotes*`,
            description: `└ deskripsi: Auto quotes bot`
        },
        {
            command: `📝 ${prefix} *toxic*`,
            description: `└ deskripsi: Auto toxic bot`
        },
        {
            command: `📝 ${prefix} *randomnime*`,
            description: `└ deskripsi: Merandom gambar animek`
        },
        {
            command: `📝 ${prefix} *randomhentai*`,
            description: `└ deskripsi: Merandom gambar hentai`
        },
        
        {
            command: `📝 ${prefix} *hit*`,
            description: `└ deskripsi: View total hit on this Bot.`
        },
        {
            command: `📝 ${prefix} *countme*`,
            description: `└ deskripsi: Melihat berapa kali kamu menggunakan command Bot.`
        },
        {
            command: `📝 ${prefix} *stat*`,
            description: `└ contoh: ${prefix}stat !getall`
        },

        {
            command: `📝 ${prefix} *krisar*`,
            description: `└ contoh: ${prefix}krisar tambahin menu lagi a`
        },
        {
            command: `📝 ${prefix} *about*`,
            description: `└ deskripsi: Menampilkan informasi Bot.`
        },
        {
            command: `📝 ${prefix} *donasi*`,
            description: `└ deskripsi: Menampilkan informasi Donasi`
        }
      ]
    )
})

const countList = new Promise((resolve, reject) => {
    resolve([
        'setName', 'setDesc', 'demote', 'promote', 'kick', 'kickall', 'kickme', 'add', 'owner', 'getall',
        'quotes', 'toxic', 'randomnime', 'randomhentai', 'krisar', 'ytmp3', 'ytmp4', 'igdl', 'qr', 'tts', 'js',
        'wiki', 'sial', 'jodoh', 'sifat', 'artinama', 'jnt', 'pos', 'lex', 'tiki', 'lion', 'sicepat', 'anteraja',
        'joinbot'
    ])
})

const donasi = (name) => new Promise((resolve, reject) => {
    resolve(`
Halo kak ${name}, Jika berkenan untuk menyisihkan donasinya yah ka :D

via Pulsa Tsel: 0822-9926-5151

Terimakasih, berapapun nilainya asal dengan keikhlasan hati dapat menjadikan pahala.
    `)
})

module.exports = {
    groupList,
    otherList,
    countList,
    donasi
}
