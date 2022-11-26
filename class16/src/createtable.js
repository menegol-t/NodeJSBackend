const {options}= require("../options/mariaDb")
const knex = require("knex")(options)
    
knex.schema
    .createTable("cars", (table) => {
        table.increments("id")
        table.string("name", 200)
        table.integer("price")
    })
    .then(()=> console.log("tabla creada"))
    .catch((err)=>console.log(err))
    .finally(()=> {
        knex.destroy()
    })