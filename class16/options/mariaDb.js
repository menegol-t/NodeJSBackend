// const options = {
// 	client: "mysql",
// 	connection: {
//     	host: "127.0.0.1",
// 	    user: "root",
// 	    password: "",
// 	    database: "sqldb"
//     }
// }

const options = {
	client: "sqlite3",
	connection: {filename: "./myDB.sqlite"},
	useNullAsDefault: true
}

module.exports = {
	options,
}