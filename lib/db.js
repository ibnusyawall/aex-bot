//const mysql = require('mysql')

class MySql {
    constructor(conn) {
		this.db = 'wabot2';
		this.user = 'wabot2';
		this.pass = 'wabot2';
		this.host = 'localhost';
		this.conn = this.conn

		// koneksi ke database
		this.conn = mysql.createConnection({
			host: this.host,
			user: this.user,
			password: this.pass,
			database: this.db,
		})
		this.conn.connect((err) => {
			if (err) throw err;
			console.log('! sukses terkoneksi')
		})
    }
    totalhit(callback) {
        let sql = "SELECT * FROM hitUser"
        this.conn.query(sql, (err, result) => {
            callback(undefined, {
                data: result.length
            })
        })
        console.log(result)
    }
}

module.exports = MySql;