export const dbConfig = {
    messages: {
        client: "sqlite3",
	    connection: {filename : "ecommerse.sqlite"},
	    useNullAsDefault: true
    },
    
    products: {
	    client: "mysql",
	    connection: {
    	    host: "localhost",
	        user: "root",
            password: "",
	        port: 3306,
	        database: "sqldb"
        }
    } 
}
