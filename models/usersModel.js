const sqlite3 = require("sqlite3").verbose()
const db_path = "./db/course.db"

const usersModel = {
	getAllUsers: (call) => {
		const db = new sqlite3.Database(db_path, (err) => {
			if(err){
				call(err)
				return
			}
		})

		db.run("CREATE TABLE IF NOT EXISTS users (username varchar(64) primary key not null, password varchar(64) not null, role varchar(8) not null)")

		db.all('SELECT * FROM users', (err, rows) => {
			db.close();
		    call(err ? err : null, err ? null : rows)
		});
	},
	getUserByName: (username,call) => {
		const db = new sqlite3.Database(db_path, (err) => {
			if(err){
				call(err)
				return
			}
		})

		db.run("CREATE TABLE IF NOT EXISTS users (username varchar(64) primary key not null, password varchar(64) not null,  role varchar(8) not null)")

		db.all(`SELECT * FROM users where username = '${username}'`, (err, rows) => {
			db.close()
		    call(err ? err : null, err ? null : rows)
		});
	},
	createUser: (payload,call) => {
		const db = new sqlite3.Database(db_path, (err) => {
			if(err){
				call(err)
				return
			}
		})

		db.run("CREATE TABLE IF NOT EXISTS users (username varchar(64) primary key not null, password varchar(64) not null, role varchar(8) not null)")

		db.all(`INSERT INTO users VALUES ('${payload.username}', '${payload.password}', 'user')`, err => {
			db.close()
		    call(err ? err : null)
		});	
	},
	deleteUser: (username,call) => {
		const db = new sqlite3.Database(db_path, (err) => {
			if(err){
				call(err)
				return
			}
		})

		db.run("CREATE TABLE IF NOT EXISTS users (username varchar(64) primary key not null, password varchar(64) not null, role varchar(8) not null)")

		db.all(`delete from users where username = '${username}'`, err => {
			db.close()
		    call(err ? err : null)
		});	
	},
	authLogin: (payload,call) => {
		const db = new sqlite3.Database(db_path, (err) => {
			if(err){
				call(err)
				return
			}
		})

		db.run("CREATE TABLE IF NOT EXISTS users (username varchar(64) primary key not null, password varchar(64) not null,  role varchar(8) not null)")

		db.all(`SELECT * FROM users where username = '${payload.username}' and password = '${payload.password}'`, (err, rows) => {
			db.close()
		    call(err ? err : null, err ? null : rows)
		});
	}

}

module.exports = usersModel