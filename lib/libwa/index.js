/**
 * AEX BOT PROJECT
 * Any question or problem ? Contact me!
 * Change Log : send media has been fixed.
**/

const request = require('request')
const fs = require('fs')
const QRReader = require('qrcode-reader');
const jimp = require('jimp');
const gTTS = require("gtts.js").gTTS;

class LibBot {
	constructor(conn) {

	}
	menuBot_(callback) {
		const menuBot = () => {
			let str =
			`
🔐 -----  AEX BOT GROUP ----- 🔐

🍻 -> Menu --| Admin (owner) |-- 🍻

⚙  *'!setName <optional>'* Ubah Nama Group
💡  *'!setDesc <optional>'* Ubah Deskripsi Group
🤾🏻‍♀  *'!demote <@tagmember>'* DEMOTE
🎖  *'!promote <@tagmember>'* PROMOTE
🤺  *'!kick <@tagmember>'* TENDANG
💌  *'!add <number>'* UNDANG
🚀  *'!owner'* Melihat Siapa Owner Group

🍻 -> Menu --| ETC |-- 🍻

🧷  *'!quotes'* View Quotes
🧷  *'!toxic'* View Toxic
🧷  *'!film <title>'* Cari Film
🧷  *'!bot join <optional>'* Undang Bot Ke Group Kalian
🧷  *'!qr <optional>'* QR Code Maker
🧷  *'!read qr <media>'* QR Code Reader
🗣  *'!tts [en/id] <optional>'* Text To Speech
�  *'!ytdl <link>'* Youtube MP3 Downloader

🍻 -> Menu --| SPAM WHATSAPP |-- 🍻

💌  *'!spam <nomor> <jumlah> <key>'* Spam WA by AEX-BOT
💌  *'!spamKey'* KEY Spam WA by AEX-BOT

🍻 -> Menu --| SPAM WHATSAPP |-- 🍻

🍻 -> Menu --| base64 & etc |-- 🍻

🧷  *'!bs64 enc <string>'* Encrypt String
🧷  *'!bs64 dec <string>'* Encode String
🧷  *'!hash sha1 <string>'* SHA1 Encrypt
🧷  *'!hash sha256 <string>'* SHA256 Encrypt
🧷  *'!hash sha512 <string>'* SHA512 Encrypt

🍻 -> Menu --| base64 & etc |-- 🍻

🔐 -----  AEX BOT GROUP ----- 🔐
			`
			return str
		}
		callback(undefined, {
			data: menuBot()
		})
	}
	infoBot_(callback) {
		const infoBot = () => {
			let str =
			`
🔐 -----  AEX BOT GROUP ----- 🔐

[+] Author       : Ibnusyawall
[+] BuildWith    : NodeJS
[+] Contact      : 0822-9926-5151

🔐 -----  AEX BOT GROUP ----- 🔐
			`
			return str
		}

		callback(undefined, {
			data: infoBot()
		})
	}
	hitUser(dari, callback) {
		let data = {dari: dari}
		let sql = "INSERT INTO hitUser SET ?"
		this.conn.query(sql, data, (err, results, fields) => {
			callback(undefined, {
				data: 200
			})
			console.log('user ke : ', results['insertId'])
		})
	}
	countHit(callback){
		let sql = "SELECT * FROM hitUser"
		this.conn.query(sql, (err, result) => {
			callback(undefined, {
				data: result.length
			})
		})
		console.log(result)
	}
	setGcName(judul) {
		let judul_ = judul.slice(9)
		return judul_
	}
	coronaBot(negara, callback){
		let url = 'https://des-apicorona.herokuapp.com?negara='
		request(`${url}${negara}`, {json: true}, (err, resp, body) => {
			if (!negara) {
				callback(undefined, {
					data: '👋🏻 Masukan nama negara terlebih dahulu.'
				})
			} else {
				callback(undefined, {
					negara: body['result']['negara'],
					meninggal: body['result']['meninggal'],
					positif: body['result']['positif'],
					sembuh: body['result']['sembuh']
				})
			}
		})
	}
	addQuotes(quotes, dari, callback) {
		let filter = ['SELECT * FROM', 'DELETE', 'UPDATE', 'WHERE', 'SELECT *', 'SELECT * FROM * WHERE quotes = *']
		let data = {quotes: quotes,  dari: dari}
		let sql = "INSERT INTO quotes SET ?"
		if (data.quotes.length < 12) {
			callback(undefined, {
				data: '😎👊 ini quotes ?'
			})
		} else if (filter.indexOf(data.quotes) != -1) {
			callback(undefined, {
				data: '😎👊 Hayoloh mu ngapain ?'
			})
		} else {
			this.conn.query(sql, data, (err, results, fields) => {
				callback(undefined, {
					data: 200
				})
				//console.log(dataQ)
				console.log('quotes ditambahkan')
				/*this.conn.query("SELECT * FROM quotes WHERE ", (err, results) => {
					console.log(results[0])
				})*/
			})

		}
	}
	addRequest(permintaan, dari, callback) {
		const dataQ = []
		let filter = ['SELECT * FROM', 'DELETE', 'UPDATE', 'WHERE', 'SELECT *', 'SELECT * FROM * WHERE quotes = *']
		let data = {permintaan: permintaan,  dari: dari}
		let sql = "INSERT INTO permintaan SET ?"
		if (filter.indexOf(data.permintaan) != -1) {
			callback(undefined, {
				data: '😎👊 Hayoloh mu ngapain ?'
			})
		} else {
			this.conn.query(sql, data, (err, results) => {
				dataQ.push(permintaan, results['insertId'])
				//id = dataQ[1]
				callback(undefined, {
					data: 200,
					permintaan: dataQ[0],
					id: dataQ[1]
				})
				console.log('permintaan diterima')
			})

		}
	}
	quotesView(callback) {
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
			'I promise that i`ll love you in every step of mine',
			'Aku tidak pernah keberatan menunggu siapa pun berapa lama pun selama aku mencintainya.',
			'Aku tak ingin berakhir seperti mereka, saling mencintai. Lantas kehilangan dan kini mereka hanya mengenang dan merenung dari jauh.',
			'Kau mencintaiku tanpa sepatah kata, aku mencintaimu, dengan satu kata yang tak pernah patah.',
			'Allah menciptakan senja untuk mengingatkanku untuk pulang pada cinta yang kukenang.',
			'Cinta tak berupa tatapan satu sama lain, tetapi memandang keluar bersama ke arah yang sama.',
			'Cinta tidak terlihat dengan mata, tetapi dengan hati.',
			'Cinta itu layaknya angin, aku tidak bisa melihatnya tetapi aku bisa merasakannya.',
			'"Cinta tidak pernah menuntut, cinta selalu memberi. Cinta selalu menderita, tanpa pernah meratap, tanpa pernah mendendam.',
			'Masa lalu saya adalah milik saya, masa lalu kamu adalah milik kamu, tapi masa depan adalah milik kita.',
			'Bahagia itu kita yang ciptain, bukan mereka.',
			'Cinta itu, rela melihat orang yang kita cintai bahagia bareng orang lain.',
			'Aku hanyalah kunang-kunang, dan kau hanyalah senja, dalam gelap kita berbagi, dalam gelap kita abadi.',
			'Dalam diam, aku memperjuangkan cintamu dalam doaku.',
			]
			const arrAcak = arr[Math.floor(Math.random() * arr.length)]
			return arrAcak
		}
		callback(undefined, {
			data: quotesBot()
		})
	}
	toxicView(callback) {
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
		callback(undefined, {
			data: toxicBot()
		})
	}
	cariMovie(judul, callback) {
		let url = 'https://ostch.herokuapp.com/api/v1/movie?q='
		request(`${url}${judul}`, {json: true}, (err, resp, body) => {
			if (body['code'] == 200) {
				callback(undefined, {
					code: 200,
					data: [{
						title: body['result'][0]['title'],
						synopsis: body['result'][0]['synopsis'],
						release: body['result'][0]['release'],
						durasi: body['result'][0]['duration'],
						link: body['result'][0]['linkDownload']
					}]
				})
			} else {
				callback(undefined, {
					code: 400,
					data: '👋 Film yang kamu cari sepertinya tidak ada.'
				})
			}
		})
	}
	bs64enc(str, callback) {
		let data = new Buffer(str).toString('base64')
		callback(undefined, {
			data: data
		})
	}
	bs64dec(str, callback) {
		let data = new Buffer(str, 'base64').toString()
		callback(undefined, {
			data: data
		})
	}
	getBase64(file, callback) {
		let file_ = fs.readFileSync(file)
		let _file = file_.toString('base64')
		callback(undefined, {
			data: _file
		})
	}
	sha1hash(str, callback) {
		request('https://ostch.herokuapp.com/api/v1/sha1?str='+str, {json: true}, (err, resp, body) => {
			callback(undefined, {
				data: body['result'][0]['encrypt']
			})
		})
	}
	sha256hash(str, callback) {
		request('https://ostch.herokuapp.com/api/v1/sha256?str='+str, {json: true}, (err, resp, body) => {
			callback(undefined, {
				data: body['result'][0]['encrypt']
			})
		})
	}
	sha512hash(str, callback) {
		request('https://ostch.herokuapp.com/api/v1/sha512?str='+str, {json: true}, (err, resp, body) => {
			callback(undefined, {
				data: body['result'][0]['encrypt']
			})
		})
	}
	readQR(file, callback) {
		run().catch(error => console.error(error.stack));

		async function run() {
			const img = await jimp.read(fs.readFileSync(file));
			const qr = new QRReader();


			const value = await new Promise((resolve, reject) => {
				qr.callback = (err, v) => err != null ? reject(err) : resolve(v);
				qr.decode(img.bitmap);
			});
			for (const point of value.points) {
			  img.scan(Math.floor(point.x) - 5, Math.floor(point.y) - 5, 10, 10, function(x, y, idx) {
			    // Modify the RGBA of all pixels in a 10px by 10px square around the 'FinderPattern'
			    this.bitmap.data[idx] = 255; // Set red to 255
			    this.bitmap.data[idx + 1] = 0; // Set blue to 0
			    this.bitmap.data[idx + 2] = 0; // Set green to 0
			    this.bitmap.data[idx + 3] = 255; // Set alpha to 255
			  });
			}

			await img.writeAsync('./../data/out.png');

			callback(undefined, {
				data: value.result
			})
		}
	}
	spamWaBot(key, callback) {
		run().catch(error => console.error(error.stack));
		async function run() {
			const arrKey = ['aex', 'a@:c', ',,x']
			const makeKey = (_k) => {
				let a = new Buffer(_k).toString('base64').split('').reverse().join(arrKey[1].toString())
				return a
			}
			const decKey = (_key) => {
				let b = _key.split('').reverse().join('').toString().replace(/c:@a/gi)
				return new Buffer(b, 'base64').toString()
			}
			const img = await jimp.read(fs.readFileSync(key));
			const qr = new QRReader();

			const value = await new Promise((resolve, reject) => {
				qr.callback = (err, v) => err != null ? reject(err) : resolve(v);
				qr.decode(img.bitmap);
			});

			const kSpam = makeKey('b-spam|aex_xixi+')
			const kFlag = decKey(value.result)
			console.log(value.result)
			console.log(kSpam)
			console.log(kFlag)
			if (value.result == kSpam) {
				callback(undefined, {
					ok: 'success',
					key: value.result
				})
			} else {
				callback(undefined, {
					ok: 'failed',
					key: value.result
				})
			}
		}
	}
	tts(str, callback) {
		const tts = new gTTS(str);
		tts.save("./../data/out.mp3")
			.then(() => {
				const file = fs.readFileSync('./../data/out.mp3')
				const data = file.toString('base64')
				callback(undefined, {
					data: data
				})
			})
			.catch((err) => {
				console.log(err)
			 })
	}
}




module.exports = { LibBot }
