const knex = require("knex")
const dbConfig = require("../options/knex")

const options = {
	client: "mysql",
	connection: {
		host: "localhost",
		user: "root",
		password: "",
		port: 3306,
		database: "sqldb"
	}
}

class DBServices {
	constructor(availableDb){
		console.log(availableDb);
		// console.log(dbConfig);
		// const options = dbConfig
		// console.log(options);
	    this.knex = knex(options)
    }

    innit(){
        this.knex.schema.hasTable("messages").then((exists)=>{

	    	if(exists){
	        	return console.log("tabla ya creada")
        	}else{
	        	return this.knex.schema.createTable("messages", async (messages)=>{
		        	messages.increments()
                	messages.string("email").notNullable()
					messages.string("message").notNullable()
					messages.string("time").notNullable()
					console.log("se creo la tabla messages!")
				})
			}
		})

		this.knex.schema.hasTable("products").then((exists)=>{
			if(exists){
				return console.log("tabla ya creada")
			}else{	
				return this.knex.schema.createTable("products", async (products)=>{
					products.increments()
					products.string("title").notNullable()
					products.decimal("price", 10, 2).notNullable()
					products.string("thumbnail").notNullable()
					products.integer("stock").notNullable()
					products.string("description").notNullable()
					products.string("code").notNullable()
					products.string("timestamp").notNullable()
					console.log("tabla ya creada")
				})
			}
		})
	}

	get(tableName, id){
		if(id){
			return this.knex(tableName).where("id", id)
		}else{
			return this.knex(tableName)
		}
	}

	create(tableName, data){
		return this.knex(tableName).insert(data)
	}

	update(tableName, id, data){
		return this.knex(tableName).where("id", id).update(data)
	}

	delete(tableName, id){
		return this.knex(tableName).where("id", id).del()
	}
}

module.exports = DBServices