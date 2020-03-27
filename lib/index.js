const mysql   = require('mysql')
const request = require('request')
const fs = require('fs')
const QRReader = require('qrcode-reader');
const jimp = require('jimp');

class LibBot {
	constructor(conn) {
		this.db = 'wtktkgbt_wabot2';
		this.user = 'wtktkgbt_wabot2';
		this.pass = 'wabot2';
		this.host = '156.67.213.223';
		this.conn = this.conn

		// koneksi ke database
		this.conn = mysql.createPool({
			host: this.host,
			user: this.user,
			password: this.pass,
			database: this.db,
		})
		this.conn.getConnection((err) => {
			if (err) throw err;
			console.log('sukses terkoneksi')
		})
	}
	menuBot_(callback) {
		const menuBot = () => {
			let str =
			`
			🔐 -----  AEX BOT GROUP ----- 🔐

			🍻 -> Menu --| Admin |-- 🍻

			⚙  *'!setName <optional>'* Ubah Nama Group
			💡  *'!setDesc <optional>'* Ubah Deskripsi Group
			🤾🏻‍♀  *'!demote <number>'* DEMOTE
			🎖  *'!promote <number>'* PROMOTE 
			🤺  *'!kick <number>'* TENDANG
			💌  *'!add <number>'* UNDANG
			📑  *'!glink'* GENERATE-LINK (build-off)

			🍻 -> Menu --| ETC |-- 🍻

			🧷  *'!quotes add <optional>'* Make Quotes
			🧷  *'!quotes'* View Quotes
			🧷  *'!toxic'* View Toxic 
			🧷  *'!film <title>'* Cari Film
			🧷  *'!bot join <optional>'* Undang Bot Ke Group Kalian
			🧷  *'!qr <optional>'* QR Code Maker
			🧷  *'!read qr <media>'* QR Code Reader
			💌  *'!spam <number> <isipesan> <jumlah>'* Spam WA by AEX-BOT
			⏱  *'!bot hit'* Total Hit
			🗣  *'!bot request <request>'* Request Tools / Saran


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

			[|] Author       : Ibnusyawall & all mem DevOps AEXBOT
			[|] BuildWith  : NodeJS
			[|] Contact     : 0822-9926-5151
			[|] Status BOT : Testing

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
			'I promise that i`ll love you in every step of mine'
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
	getBase64(file, callback) {
		let file_ = fs.readFileSync(file)
		let _file = file_.toString('base64')
		callback(undefined, {
			data: _file
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
			
			callback(undefined, {
				data: value.result
			})
		}
	}
	spamWaBot(nomormu, callback) {

	}
}




module.exports = { LibBot }

