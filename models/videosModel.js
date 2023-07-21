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

		db.run("CREATE TABLE IF NOT EXISTS videos (url varchar(32) primary key not null)")

		db.all('SELECT * FROM videos', (err, rows) => {
			db.close()
		    call(err ? err : null, err ? null : rows)
		});
	},
	createVideo: (url,call) => {
		const db = new sqlite3.Database(db_path, (err) => {
			if(err){
				call(err)
				return
			}
		})

		db.run("CREATE TABLE IF NOT EXISTS videos (url varchar(32) primary key not null)")

		db.all(`INSERT INTO videos VALUES ('${url}')`, err => {
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

		db.run("CREATE TABLE IF NOT EXISTS videos (url varchar(32) primary key not null)")

		db.all(`delete from videos where url = '${url}'`, err => {
			db.close()
			call(err ? err : null)
		});	
	}

}

module.exports = videosModel