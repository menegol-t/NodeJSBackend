const knex = require("knex")
const {dbConfig} = require("../options/knex")

class DBServices {
	constructor(availableDb){
		const options = dbConfig[`${availableDb}`]
	    this.knex = knex(options)
		this.database = availableDb
    }

    async innit(){
		if(this.database == "messages"){
			await this.knex.schema.hasTable("messages").then((exists)=>{

				if(exists){
					return console.log(`Tabla ${this.database} ya creada en ${dbConfig[`${this.database}`].client}`)
				}else{
					return this.knex.schema.createTable("messages", async (messages)=>{
						messages.increments()
						messages.string("email").notNullable()
						messages.string("message").notNullable()
						messages.string("timestamp").notNullable()
						console.log(`Se creo la Tabla ${this.database} en base de datos ${dbConfig[`${this.database}`].client} `)
					})
				}
			})
		}else if(this.database == "products"){
			await this.knex.schema.hasTable("products").then((exists)=>{

				if(exists){
					return console.log(`Tabla ${this.database} ya creada en ${dbConfig[`${this.database}`].client}`)
				}else{	
					return this.knex.schema.createTable("products", async (products)=>{
						products.increments()
						products.string("title").notNullable()
						products.integer("price").notNullable()
						products.string("thumbnail").notNullable()
						// await products.integer("stock").notNullable()
						// await products.string("description").notNullable()
						// await products.string("code").notNullable()
						console.log(`Se creo la Tabla ${this.database} en base de datos ${dbConfig[`${this.database}`].client} `)
					})
				}
			})
		}else{
			console.log("Por favor selecciona una base de datos valida");
		}
	}

	async get(id){
		if(id){
			return await this.knex(this.database).where("id", id)
		}else{
			return await this.knex(this.database)
		}
	}

	async save(data){
		const savedData = await this.knex(this.database).insert(data)
		data.id = savedData[0]
		return await data
	}

	async update(id, data){
		return await this.knex(this.database).where("id", id).update(data)
	}

	async delete(id){
		return await this.knex(this.database).where("id", id).del()
	}
}

module.exports = DBServices