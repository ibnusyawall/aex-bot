const fs = require('fs')

const { Client, Location, GroupChat } = require('./whatsapp-web.js/index');

const SESSION_FILE_PATH = './whatsapp-web.js/session.json';

let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
	sessionCfg = require(SESSION_FILE_PATH);
}

const client = new Client({ puppeteer: { headless: false }, session: sessionCfg });
// You can use an existing session and avoid scanning a QR code by adding a "session" object to the client options.
// This object must include WABrowserId, WASecretBundle, WAToken1 and WAToken2.

client.initialize();

client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    console.log('QR RECEIVED', qr);
});

client.on('authenticated', (session) => {
	console.log('AUTHENTICATED', session);
	sessionCfg=session;
	fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
		if (err) {
			console.error(err);
		}
	});
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessfull
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
	console.log('READY');
});

client.on('message', async msg => {
	console.log('[:] PESAN DITERIMA ', msg);
	const quotesBot = () => {
		const arr = ['Bagi dunia, kamu mungkin satu orang, tetapi bagi satu orang kamu adalah dunia.',
		'Cinta mungkin hadir karena takdir tapi tak ada salahnya kita saling memperjuangkan.',
		'Cinta adalah d imana kamu selalu punya alasan untuk kembali meski kamu sudah berjalan begitu jauh.',
		'Dalam cinta, menyerah tak selalu berarti kamu lemah. Kadang itu hanya berarti kamu cukup kuat tuk melepaskannya.',
		'Kamu mungkin memegang tanganku untuk sementara waktu, tetapi kamu memegang hatiku selamanya.',
		'Saat aku bersamamu, aku akan melepaskan segala ketakutan dan kecemasan.',
		'Kamu nyaman? Kamu sayang? Tapi cuma dianggap temen? Kadang gitu. Nyamanmu belum tentu nyamannya. Cukup dipahami aja.',
		'Dibilang sayang? Iya. Dibilang cinta? Iya. Dibilang pacar? Bukan.',
		'Apakah namamu WiFi? Soalnya aku bisa merasakan konektivitas.',
		'Bersamamu aku tidak pernah takut lagi menjadi pemimpi.',
		'Move on itu pilihan. Gagal move on itu cobaan. Pura-pura move on itu pencitraan.',
		'Sepurane aku nggak nguber awakmu maneh. Kepastianmu abstrak, podo karo raimu.',
		'You`re just my cup of tea.',
		'My love belongs to you.',
		'I love you - those three words have my life in them.',
		'You are my strength but loving you is my biggest weakness.',
		'I promise that i`ll love you in every step of mine'
		]
		const arrAcak = arr[Math.floor(Math.random() * arr.length)]
		return arrAcak
	}

	const toxic = ['babi', 'monyet', 'anjing', 'dino', 'jembut',
	'memek', 'kontol', 'tempik', 'bool', 'gay', 'lesbi', 'mpshh',
	'sempak', 'cangcut', 'bagong', 'torpedo', 'bangsat', 'maling',
	'copet', 'ngentot'
	]

	const toxicBot = () => {
		const randToxic = toxic[Math.floor(Math.random() * toxic.length)]
		const arr = [`muka lo kek ${randToxic}`, `anda tau ${randToxic} ?`,`${randToxic} Lo ${randToxic}`,
		`ngapa ${randToxic} ga seneng?`,`ribut sini lo ${randToxic}`,`jangan ngakak lo ${randToxic}`,
		`wey ${randToxic}!!`,`aku sih owh aja ya ${randToxic}`,`ga seneng send lokasi lo ${randToxic}`,
		`capek w ${randToxic}`, `hari ini kau minat gelut ${toxic[2]} ?`,
		`w ganteng dan lo kek ${randToxic}`,`bucin lo ${randToxic}`,`najis baperan kek ${randToxic}`,
		`nge-teh ${randToxic}`,`gaya lo sok iye, mukalo kek ${randToxic}`,`${randToxic} awokwowkok`
		]
		const arrAcak = arr[Math.floor(Math.random() * arr.length)]
		return arrAcak
	} 
	const bacotinBot = (a) => {
		const randToxic = toxic[Math.floor(Math.random() * toxic.length)]
		const arr = [`muka si ${a} kek ${randToxic}`, `yah lo ${a} tolol ${randToxic}`, `keliatan ${toxic[7]} lo ${a}`]
		const arrAcak = arr[Math.floor(Math.random() * arr.length)]
		return arrAcak
	}
	const salamBot = ['p', 'hi', 'pp', 'mikum', 'assalamualaikum', 'woy', 'bos', 'sob']
	console.log(salamBot.indexOf(''))
	if (msg.body == "!bot quotes" || msg.body == "!bot gombal") {
		const users = await msg.getContact()
		const chat  = await msg.getChat()
		chat.sendMessage(`Quotes request by @${users.number},\n\nQuotes :\n\n " *${quotesBot()}* " `, {
			mentions: [users]
		})
	} else if (msg.body == '!bot menu' || msg.body == '!bot help') {
		client.sendMessage(msg.from, `[:] List Of Command [:] \n\n '!bot menu' [show menu]\n...\n '!bot toxic' [random toxic]\n...\n '!bot quotes' [random quotes]\n...\n '!bot invite <number>' [add member 'only admin']\n...\n '!bot kick <number>' [kick member 'only admin']\n...\n '!bot promote <number>' [promote to admin 'only admin']\n...\n '!bot demote <number>' [demote admin 'only admin']`)
	} else if (msg.body == '!bot toxic' || msg.body == '!bot bacot') {
		client.sendMessage(msg.from, toxicBot());
	} else if (msg.body == '!bot start') {
		client.sendMessage(msg.from, '[:] aex_bot is starting .. ');
	} else if (salamBot.indexOf(msg.body.toLowerCase()) >= 0) {
		client.sendMessage(msg.from, 'waalaikumsalam wr.wb')
		salamBot.indexOf(msg.body)
	} else if (msg.body == '!bot id') {
		//const chat = new GroupChat();
		client.sendMessage(msg.from, `[:] id kamu : ${JSON.stringify(msg.author)}`)
	} else if (msg.body.startsWith('!bot invite ')) {
		let chat = await msg.getChat();
		if (chat.isGroup) {
			const noUser = msg.body.slice(12);
			if (noUser == "") {
				msg.reply('[:] nomor harus diisi!')	
			} else {
				chat.addParticipants([noUser+'@c.us'])
				msg.reply(`[:] Selamat datang ${noUser}! jangan lupa baca Deskripsi group yah:D`)
			}
		} else {
			msg.reply('[:] harus didalam group!')
		}
	} else if (msg.body.startsWith('!bot promote ')) {
		let chat = await msg.getChat();
		if (chat.isGroup) {
			const noUser = msg.body.slice(13);
			chat.promoteParticipants([noUser+'@c.us'])
			msg.reply(`[:] @${noUser} sekarang anda adalah admin!.`)
		} else {
			msg.reply('[:] harus didalam group!')
		} //demoteParticipants
	} else if (msg.body.startsWith('!bot demote ')) {
		let chat = await msg.getChat()
		if (chat.isGroup) {
			const noUser = msg.body.slice(12);
			chat.demoteParticipants([noUser+'@c.us'])
			msg.reply(`[:] @${noUser} sekarang anda bukan lagi admin.`)
		} else {
			msg.reply('[:] harus didalam group!')
		}
	} else if (msg.body == '!test') {
		let chat = await msg.getChat()
		msg.reply(chat.getInviteCode())
	} else if (msg.body == '!rpl tugas') {
		msg.reply(`
	*TUGAS X RPL A MINGGU 2*

=> B.indo(classroom)::Kosong!
=> PAI BP(classroom)::kosong!
=> PRODAS(classroom):: kosong!
=> FISIKA(classroom)::(task)dl jumat!
=> B.ING(classroom)::(Daily activities)dl Besok!
=> KJD(classroom)::kosong!
=> SISKOMDIG (classroom)::(Vid. tutor sinkron asingkron)dl jumat!
=> B.SUN :: kosong
=> DDG :: kosong
=> PKN :: kosong
=> MTK (classroom)::kosong
=> SJI :: Besok!
=> KIMIA :: Jumat!
=> SENBUD :: Empty

TUGAS DISELESAIKAN DENGAN BAIK DAN BENAR
SEMANGAT!!!>○<
			`)
	} /*else if (msg.type == 'sticker') {
		let toxic = ['anjing', 'kontol', 'memek', 'jembut']
		toxic = toxic[Math.floor(Math.random() * toxic.length)]
		msg.reply(`stiker terus lo ${toxic}`)
	} else if (msg.body.startsWith('!bot kick ')) {
		let chat = await msg.getChat();
		if (chat.isGroup) {
			let noUser = msg.body.slice(10);
			chat.removeParticipants([noUser])
		} else {
			msg.reply('[:] harus didalam group!')
		}
	} *//*else if (msg.body == `!bot bacotin si `) {
		const chat  = await msg.getContact()
		const match = /^[0-9]+$/.exec(msg.body)
		msg.sendMessage(msg.form, bacotinBot(`@${match}`))
	}*/ else if (msg.body == '!bot ginfo') {
		let chat = await msg.getChat();
		if (chat.isGroup) {
			msg.reply(`
				*Group Info*\n\n*Nama*: ${chat.name}\n*Deskripsi*:\n '${chat.description}'\n*Tanggal*: ${chat.createdAt.toString()}\n*Author*: ${chat.owner.user}\n*T.Member*: ${chat.participants.length}
				`);
		} else {
			msg.reply('This command can only be used in a group!');
		}
	}

	// ------ X RPL A BOT ---- //
	else if (msg.body == '!rpl menu')  {
		let menu = ' *!rpl jadwal* => ```Melihat Jadwal Pelajaran```\n *!rpl tugas* => ```Melihat Tugas```'
		msg.reply('[!] Perintah yang bisa/dapat digunkan : \n\n'+menu)
	} else if (msg.body == '!bot out') {
		let chat = await msg.getChat();
		chat.leave();
	} else if (msg.body == '!rpl jadwal') {
		let menu = `
<<<<<   Jadwal pelajaran   >>>>>
            X RPL A
SENIN : Pjok - Fisika - B.indo - Pai bp
SELASA : B.ing - SJI - KJD - MTK
RABU : PKN - B.indo - S.bud - Siskom
KAMIS : B.sunda - Prodas - DDG - MTK
JUMAT : Kimia - KJD - Simdig

         *SEMANGATT SEMUA
Strong to make your future succes*`
		msg.reply(menu)
	} 
	// ------ X RPL A BOT ---- //
	/*else {
		//const listOptions = 'Command Invalid! read example :\n\nExample: !bot <options>\n\nOptions:\n\n quotes ... (random quotes)\n\n toxic ... (random toxic)\n\n@aex_bot by stech'
		client.sendMessage(msg.from, '... ');
	}*/
})

