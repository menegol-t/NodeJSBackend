const express = require("express")

const fs = require('fs')

const app = express()

const PORT = process.env.port || 8080

let respuesta

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
        await fs.promises
            .readFile("./productos.json", "utf-8")
                .catch((err)=>{console.log("Fallo la lectura del archivo: " + err)})
                .then((output) => JSON.parse(output))
                .then((contenido) => {
                    const objetoFiltrado = contenido.find(objetos => objetos.id == numero)
                    console.log(objetoFiltrado)
                    respuesta = objetoFiltrado;
                })
    }
    async getAll(){
        await fs.promises
            .readFile("./productos.json", "utf-8")
                .catch((err)=> console.log("Fallo la lectura del archivo: " + err))
                .then((output) => JSON.parse(output))
                .then((contenido) => {respuesta = contenido})
    }
}

const prueba = new Contenedor("productos")

const getById = async (numero) => await prueba.getById(numero)

const getAll = async () => await prueba.getAll()

app.get("/", (request, response) => {
	response.send("Estas en root /")
})

app.get("/productos", (request, response) => {
    getAll().then(response.send(respuesta))
    
})

app.get("/productosRandom", (request, response) => {
    let randomId = between(1, 3)
    getById(randomId).then(response.send(respuesta))
	
})
