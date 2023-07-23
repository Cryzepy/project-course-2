const sqlite3 = require("sqlite3").verbose()
const db_path = "./db/course.db"

const videosModel = {
	getAllVideos: (call) => {
		const db = new sqlite3.Database(db_path, (err) => {
			if(err){
				call(err)
				return
			}
		})

		db.run("CREATE TABLE IF NOT EXISTS videos (url varchar(32) primary key not null, googleForm varchar(128))")

		db.all('SELECT * FROM videos', (err, rows) => {
			db.close()
		    call(err ? err : null, err ? null : rows)
		});
	},
	createVideo: (payload,call) => {
		const db = new sqlite3.Database(db_path, (err) => {
			if(err){
				call(err)
				return
			}
		})

		db.run("CREATE TABLE IF NOT EXISTS videos (url varchar(32) primary key not null, googleForm varchar(128))")

		db.all(`INSERT INTO videos VALUES ('${payload.url}', ${payload.googleForm})`, err => {
			db.close()
		    call(err ? err : null)
		});	
	},
	deleteVideo: (url,call) => {
		const db = new sqlite3.Database(db_path, (err) => {
			if(err){
				call(err)
				return
			}
		})

		db.run("CREATE TABLE IF NOT EXISTS videos (url varchar(32) primary key not null, googleForm varchar(128))")


		db.all(`delete from videos where url = '${url}'`, err => {
			db.close()
			call(err ? err : null)
		});	
	}

}

module.exports = videosModel