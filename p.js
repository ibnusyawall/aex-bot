const fs = require('glob')

/*fs.readdir(fl).forEach(file => {
	const flA = new Array()
	console.log(flA)
})*/

/*fs.readdir(fl, (err, files) => {
	files.forEach(file => {
		console.log(file)
	})
})*/

fs("./image/*.jpg", (er, files) => {
	console.log(files[0].replace('./image/', ''))
})