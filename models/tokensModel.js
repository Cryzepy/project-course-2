const sqlite3 = require("sqlite3").verbose()
const db_path = "./db/course.db"

const tokensModel = {
	getAllTokens: (call) => {
		const db = new sqlite3.Database(db_path, (err) => {
			if(err){
				call(err)
				return
			}
		})

		db.run("CREATE TABLE IF NOT EXISTS tokens (token varchar(32) primary key not null, username varchar(64) not null, expired int)")

		db.all('SELECT * FROM tokens', (err, rows) => {
			db.close()
		    call(err ? err : null, err ? null : rows)
		});
	},
	getTokenByName: (token,call) => {
		const db = new sqlite3.Database(db_path, (err) => {
			if(err){
				call(err)
				return
			}
		})

		db.run("CREATE TABLE IF NOT EXISTS tokens (token varchar(32) primary key not null, username varchar(64) not null, expired int)")

		db.all(`SELECT * FROM tokens where token = '${token}'`, (err, rows) => {
			db.close()
		    call(err ? err : null, err ? null : rows)
		});
	},
	createToken: (payload,call) => {
		const db = new sqlite3.Database(db_path, (err) => {
			if(err){
				call(err)
				return
			}
		})

		db.run("CREATE TABLE IF NOT EXISTS tokens (token varchar(32) primary key not null, username varchar(64) not null, expired int)")

		db.all(`INSERT INTO tokens VALUES ('${payload.token}', '${payload.username}', ${Date.now() + (7 * 86400000)})`, err => {
			db.close()
		    call(err ? err : null)
		});	
	},
	deleteToken: (token,call) => {
		const db = new sqlite3.Database(db_path, (err) => {
			if(err){
				call(err)
				return
			}
		})

		db.run("CREATE TABLE IF NOT EXISTS tokens (token varchar(32) primary key not null, username varchar(64) not null, expired int)")

		db.all(`delete from tokens where token = '${token}' or expired <= ${Date.now()}`, err => {
			db.close()
			call(err ? err : null)
		});	
	}

}

module.exports = tokensModel