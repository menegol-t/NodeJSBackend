const express = require("express")

const fs = require('fs')

const app = express()

const PORT = process.env.port || 8080

const between = (min, max) => {
	return Math.floor(Math.random() * (max - min +1 ) + min )
}

const server = app.listen(PORT, () => {
	console.log(`escuchando en ${server.address().port}`)
})
server.on("error", error => console.log(`error: ${error}`))

class Contenedor {
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo
    }
    async getById(numero){
        try{
            return await fs.promises.readFile("./productos.json", "utf-8").then((output) => JSON.parse(output))
                .then((contenido) => {
                    const objetoFiltrado = contenido.find(objetos => objetos.id == numero)
                    console.log(objetoFiltrado)
                    return objetoFiltrado
                })
        }catch(err){
            console.log("Fallo la lectura del archivo: ", err)
        }
        
    }
    async getAll(){
        try{
            return await fs.promises.readFile("./productos.json", "utf-8").then((output) => JSON.parse(output))
        }catch(err){
            if(err.code == 'ENOENT'){
                console.log("SE CREA ARCHIVO")
                await fs.promises.writeFile("./productos.json", "[]") 
                return []
            }
            console.log("Fallo la lectura del archivo: ", err)
        }
    }
}

const prueba = new Contenedor("productos")

app.get("/", (request, response) => {
	response.send("Estas en root /")
})

app.get("/productos", async (request, response) => {
    const respuesta = await prueba.getAll()
    response.send(respuesta)
})

app.get("/productosRandom", async (request, response) => {
    let randomId = between(1, 3)
    await prueba.getById(randomId).then((objetoFiltrado) => response.send(objetoFiltrado))
})
