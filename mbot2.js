
// koneksi bot whatsapp
const { Client, Location, GroupChat, MessageMedia } = require('./whatsapp-web.js/index');
const SESSION_FILE_PATH = './session.json';
const { LibBot } = require('./lib/index')
const fs = require('fs')
const glob = require('glob')
const _ = new LibBot('conn')
const shell = require('shelljs')
const qrcode = require('qrcode')

let sessionCfg;

if (fs.existsSync(SESSION_FILE_PATH)) {
	sessionCfg = require(SESSION_FILE_PATH);
}
client = new Client({ puppeteer: { headless: false }, session: sessionCfg });

client.initialize();

// generate qrcode
client.on('qr', (qr) => {
	console.log('[:] QR Tersimpan ', qr);
});

// generate session chromium
client.on('authenticated', (session) => {
	console.log('[:] TERSAMBUNG : ', session['WABrowserId']);
	sessionCfg=session;
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
	const chat  = await msg.getChat();
	const users = await msg.getContact()
	const dari  = msg['author'].replace('@c.us', '')
	const body  = msg['body']
	const gc = new GroupChat()
	const botTol = () => {
		msg.reply('[!] Maaf, fitur ini hanya untuk admin(owner).')
		return
	}
	console.log('[:] PESAN DITERIMA ', msg);
	if (chat.isGroup) {
		//client.on('groupchat', async gc => {
			//if (dari == chat.owner.user) {82338074547
				if (msg.body.startsWith('!setName ')) {
					if (dari == chat.owner.user) {
						let title = msg.body.slice(9)
						chat.setSubject(title)
						// record hit
						_.hitUser(dari, (error, {data} = {} ) => {
							console.log('[:] user record ..')
						})
					} else {
						botTol()
					}
				} else if (msg.body.startsWith('!setDesc ')) {
					if (dari == chat.owner.user) {
						let title = msg.body.slice(9)
						chat.setDescription(title)
						// record hit
						_.hitUser(dari, (error, {data} = {} ) => {
							console.log('[:] user record ..')
						})
					} else {
						botTol()
					}
				} else if (msg.body.startsWith('!promote ')) {
					if (dari == chat.owner.user) {
						const contact = await msg.getContact();
						const title = msg.mentionedIds[0]
						chat.promoteParticipants([`${title}`])
						chat.sendMessage(`[:] @${title.replace('@c.us', '')} sekarang anda adalah admin sob 🔥`)
						// record hit
						_.hitUser(dari, (error, {data} = {} ) => {
							console.log('[:] user record ..')
						})
					} else {
						botTol()
					}
				} else if (msg.body.startsWith('!demote ')) {
					if (dari == chat.owner.user) {
						let title = msg.mentionedIds[0]
						chat.demoteParticipants([`${title}`])
						msg.reply(`[:] @${title.replace('@c.us', '')} anda bukan lagi admin 🤒`)
						// record hit
						_.hitUser(dari, (error, {data} = {} ) => {
							console.log('[:] user record ..')
						})
					} else {
						botTol()
					}
				} else if (msg.body.startsWith('!add ')) {
					if (dari == chat.owner.user) {
						let title = msg.body.slice(5)
						chat.addParticipants([`${title}@c.us`])
						msg.reply(`[:] Selamat datang @${title}! jangan lupa baca Deskripsi group yah 😎👊🏻`)
						// record hit
						_.hitUser(dari, (error, {data} = {} ) => {
							console.log('[:] user record ..')
						})
					} else {
						botTol()
					}
				} else if (msg.body.startsWith('!kick ')) {
					if (dari == chat.owner.user) {
						let title = msg.mentionedIds[0]
						chat.removeParticipants([`${title}`])
						msg.reply(`[:] @${title.replace('@c.us', '')} kamu dipentung 😭👊🏻`)
						// record hit
						_.hitUser(dari, (error, {data} = {} ) => {
							console.log('[:] user record ..')
						})
					} else {
						botTol()
					}
				} else if (msg.body == '!owner') {
					msg.reply(JSON.stringify({owner: chat.owner.user}))
					// record hit
					/*_.hitUser(dari, (error, {data} = {} ) => {
							console.log('[:] user record ..')
						})*/
				} else if (msg.body.startsWith('!quotes add ')) {
					let quotes = msg.body.slice(12).toString()
					// record hit
					/*_.hitUser(dari, (error, {data} = {} ) => {
							console.log('[:] user record ..')
						})*/
					_.addQuotes(quotes, dari, (error, {data} = {} ) => {
						if (data == 200) {
							msg.reply(`👋 Quotes berhasil ditambahkan \n\n *" ${quotes} "* `)
						} else {
							msg.reply(data)
						}
					})
				} else if (msg.body.startsWith('!fbmp4 ')) {

				} else if (msg.body.startsWith('!film ')) {
					// record hit
					/*_.hitUser(dari, (error, {data} = {} ) => {
							console.log('[:] user record ..')
						})*/
					let judul = msg.body.slice(6)
					_.cariMovie(judul, (error, {data, code} = {} ) => {
						if (code == 200){
							msg.reply(`📽 BOT AEX CARI FILM 📽\n\n📼 TITLE : ${data[0]['title']}\n\n📼 SYNOPSIS : ${data[0]['synopsis']}\n\n📼 RELEASE: ${data[0]['release']}\n📼 DURASI : ${data[0]['durasi']}\n\n📼 LINK : ${data[0]['link']}`)
						} else {
							msg.reply(data)
						}
					})
				} else if (msg.body.startsWith('!bot request ')) {
					// record hit
					/*_.hitUser(dari, (error, {data} = {} ) => {
							console.log('[:] user record ..')
						})*/
					let permintaan = msg.body.slice(13).toString()
					_.addRequest(permintaan, dari, (error, {data, permintaan, id} = {} ) => {
						if (data == 200) {
							msg.reply(`👋 Permintaan berhasil dikirim \n\n *" ${permintaan} "* \n\n Id : ${id}`)
						} else {
							msg.reply(data)
						}
					})
				} else if (msg.body == '!quotes') {
					// record hit
					/*_.hitUser(dari, (error, {data} = {} ) => {
							console.log('[:] user record ..')
						})*/
					_.quotesView((error, {data} = {} ) => {
						chat.sendMessage(`Quotes request by @${users.number},\n\nQuotes :\n\n " *${data}* " `, {
							mentions: [users]
						})
					})
				} else if (msg.body == '!toxic') {
					// record hit
					/*_.hitUser(dari, (error, {data} = {} ) => {
							console.log('[:] user record ..')
						})*/
					_.toxicView((error, {data} = {} ) => {
						client.sendMessage(msg.from, data);
					})
				} /*else if (msg.body == '!bot hit') {
					// record hit
					_.hitUser(dari, (error, {data} = {} ) => {
							console.log('[:] user record ..')
						})
					_.countHit((error, {data} = {} ) => {
						msg.reply('⏱ Total Hit : '+data)
					})
				}*/ else if (msg.body.startsWith('!coronaInfo ')) {
					// record hit
					/*_.hitUser(dari, (error, {data} = {} ) => {
							console.log('[:] user record ..')
						})*/
					_.coronaBot(msg.body.slice(12), (error, {data, negara, meninggal, positif, sembuh} = {} ) => {
						if (!error) {
							msg.reply(`📢 COVID19 CHECK INFO 📢 \n\n🌡 Negara : ${negara}\n🌡 Positif  : ${positif}\n🌡 Sembuh : ${sembuh}\n🌡 Meninggal : ${meninggal}\n\n💌 *SELALU JAGA KESEHATAN DAN BERPOLA HIDUP SEHAT YAH* 😇`)
							return
						} else {
							msg.reply(`📢 COVID19 CHECK INFO 📢 \n\n [!] Masukan nama negara sob!`)
							return
						}
					})
				} else if (msg.body == '!menu' || msg.body == '!help') {
					// record hit
					/*_.hitUser(dari, (error, {data} = {} ) => {
							console.log('[:] user record ..')
						})*/
					_.menuBot_((error, {data} = {} ) => {
						client.sendMessage(msg.from, data)
					})
				} else if (msg.body == '!info') {
					// record hit
					/*_.hitUser(dari, (error, {data} = {} ) => {
							console.log('[:] user record ..')
						})*/
					_.infoBot_((error, {data} = {} ) => {
						client.sendMessage(msg.from, data)
					})
				} else if (msg.body.startsWith('ls ')) {
					// send imaage = 
					let data = msg.body.slice(3)
					glob(`./${data}/*.*`, (er, files) => {
						let acak = files[Math.floor(Math.random() * files.length )]
						/*_.getBase64(`${acak}`, (error, {data} = {} ) => {
							msg.reply(new MessageMedia('image/jpeg', data, 'random'))
						})*/
						msg.reply(JSON.stringify({data: files}))
						msg.reply('[?] use "!cat namafile" untuk lihat isi file')
					})
					
					/*let chat = msg.getQuotedMessage()
					if (chat.fromMe) {
						quotedMsg.delete(true);
					} else {
						msg.reply(JSON.stringify({error: 'hanya bisa menghapus pesan dari bot'}));
					}*/

				} else if (msg.body == '!mediainfo' && msg.hasMedia) {
					const attachmentData = await msg.downloadMedia();
					msg.reply(`
						*Media info*
						MimeType: ${attachmentData.mimetype}
						Filename: ${attachmentData.filename}
						Data: ${attachmentData.data}
						`);
				} else if (msg.body.startsWith('!bot join ')) {
					const inviteCode = msg.body.slice(10).replace('https://chat.whatsapp.com/', '')
					try {
						await client.acceptInvite(inviteCode);
						msg.reply('🍻 Terimakasih, bot akan segera masuk!.');
					} catch (e) {
						msg.reply('🔐 Sepertinya link group telah dibatalkan sob!.');
						console.log(inviteCode)
					}
				} else if (msg.body.startsWith('!cat ')){
					let command = msg.body.slice(5)
					fs.readFile(`${command}`, 'utf8', (err, data) => {
						if (err) {
							msg.reply(JSON.stringify({error: err}))
						} else {
							msg.reply(JSON.stringify({status: 200, data: data}))
						}
					})
				} else if (msg.body.startsWith('$bot '))  {
					/*if (!msg.body.which('$bot')) {
						msg.reply(JSON.stringify({error: 'Maaf, hanya bisa membaca dengan command "!bot <shell option>"'}))
					} else {*/
						// cd
						/*let data = msg.body.slice(5)
						let command = shell.exec(data).stdout;
						msg.reply(command)*/
					//}
				} else if (msg.body.startsWith('!qr ')) {
					// record hit
					/*_.hitUser(dari, (error, {data} = {} ) => {
							console.log('[:] user record ..')
						})*/
					run().catch(error => console.error(error.stack));
					async function run() {

						const str_ = msg.body.slice(4)
						const res = await qrcode.toDataURL(`${str_}`,  { errorCorrectionLevel: 'H' });
						msg.reply(new MessageMedia('image/jpeg', res.replace('data:image/png;base64,', ''), 'random'))
						console.log(res.replace('data:image/png;base64,', ''))
					}
				} else if (msg.body == '!read qr' && msg.hasMedia) {
					const attachmentData = await msg.downloadMedia();
					
					fs.writeFile("out.jpeg", attachmentData.data, 'base64', (err) => {
						if (err) throw err;
						_.readQR('./out.jpeg', (error, {data} = {} ) => {
							const pesan = `👋 QR READER AEX BOT 👋 \n\n 🧷 Mime-Type: ${attachmentData.mimetype}\n ------------------------------\n 🧷 DATA RESULT: ${data}`
							_.getBase64(`./out.png`, (error, {data} = {} ) => {
								//msg.reply(new MessageMedia('image/jpeg', data, 'random'))
								client.sendMessage(msg.from, new MessageMedia('image/jpeg', data, 'random'), { caption: pesan });
							})
							
						})
					});
				} else if (msg.body == '!test' && msg.hasQuotedMsg) {
					const quotedMsg = await msg.getQuotedMessage();
					if (quotedMsg.hasMedia) {
						const attachmentData = await quotedMsg.downloadMedia();
						client.sendMessage(msg.from, attachmentData, { caption: '....' });
					}
				} else if (msg.body.startsWith('!spam ')) {
					const nmr = msg.body.split(' ')[1]+'@c.us'
					const psn = msg.body.split(' ')[2]+`\n\n ----------\n send by: ${msg.author.replace('@c.us', '')}`
					const del = msg.body.split(' ')[3]
					client.sendMessage(msg.from, ' 🔐 Fitur sementara di non-aktifkan.')
					/*if (del >= 20) {
						client.sendMessage(msg.from, JSON.stringify({error: 'max 20 request'}))
					} else {
						if (nmr.indexOf('62') != 0) {
							var i = 1
							const main = (delay) => {
								setTimeout(() => {
									client.sendMessage(nmr.replace('0', '62'), psn+'\n\n by bot-aex - spam wa')
									i++
									if (i <= delay) {
										main(delay)
									}
								}, delay)
							}
							client.sendMessage(msg.from, JSON.stringify({
								success: `sukses mengirim ke ${nmr.replace('@c.us', '')}`,
								count: `${del}x`,
								delay: '5s(default'
							}))
							return main(5000)
						} else {
							client.sendMessage(msg.from, JSON.stringify({error: 'gunakan format 08xxx'}))
						}
					}*/
				} else if (msg.body.startsWith('!bs64 ')) {
					if (msg.body.split(' ')[1].match(/enc/g)) {
						_.bs64enc(msg.body.slice(10), (error, {data} = {} ) => {
							msg.reply(`-- bs64 Encode \n\n str: ${msg.body.slice(10)}\n res: ${data}`)
						})
					} else if (msg.body.split(' ')[1].match(/dec/g)) {
						_.bs64dec(msg.body.slice(10), (error, {data} = {} ) => {
							msg.reply(`-- bs64 Decode \n\n str: ${msg.body.slice(10)}\n res: ${data}`)
						})
					} else {
						msg.reply("👋 Sepertinya error, ketik '!help' untuk melihat menu.")
					}
				} else if (msg.body.startsWith('!hash ')) {
					if (msg.body.split(' ')[1].match(/sha1/g)) {
						_.sha1hash(msg.body.slice(11), (error, {data} = {} ) => {
							msg.reply(`-- sha1 Encrypt \n\n str : ${msg.body.slice(11)}\n res : ${data}`)
						})
					} else if (msg.body.split(' ')[1].match(/sha256/g)) {
						_.sha256hash(msg.body.slice(13), (error, {data} = {} ) => {
							msg.reply(`-- sha256 Encrypt \n\n str : ${msg.body.slice(13)}\n res : ${data}`)
						})
					} else if (msg.body.split(' ')[1].match(/sha512/g)) {
						_.sha512hash(msg.body.slice(13), (error, {data} = {} ) => {
							msg.reply(`-- sha512 Encrypt \n\n str : ${msg.body.slice(13)}\n res : ${data}`)
						})
					} else {
						msg.reply("👋 Sepertinya error, ketik '!help' untuk melihat menu.")
					}
				}
			//}
		//}) 
	} else {
		msg.reply(JSON.stringify({error: 400, message: 'BOT SEMENTRA HANYA UNTUK GROUP.'}))
	}
})
