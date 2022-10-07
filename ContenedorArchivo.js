"use strict"

const fs = require('fs')

class Contenedor {
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo
    }
    innit(){
        const ruta = `./${this.nombreArchivo}.JSON`
        fs.promises
        .readFile(ruta, "utf-8")
            .then((output) => JSON.parse(output))
            .then(async (contenido) => console.log(`Ya tenias creado un archivo llamado: ${this.nombreArchivo}`))
            .catch((err)=>{
                    const data = '[]'
                    fs.promises
                        .writeFile(ruta, data)
                            .then(()=> {console.log(`Tu archivo ${this.nombreArchivo} se creo correctamente`)})
                            .catch((err)=> {console.log("Fallo la creacion del archivo: " + err)}) 
                })
                
    }
    async save(objeto){
        const ruta = `./${this.nombreArchivo}.JSON`
        await fs.promises
            .readFile(ruta, "utf-8")
                .catch((err)=>{console.log("Fallo la lectura del archivo: " + err)})
                .then((output) => JSON.parse(output))
                .then(async (contenido) => {

                    if(contenido.length === 0){
                        objeto.id = 1
                    }else{
                        objeto.id = contenido[contenido.length - 1].id + 1
                    }

                    contenido.push(objeto)

                    const contenidoGuardado = JSON.stringify(contenido)

                    await fs.promises
                        .writeFile(ruta, contenidoGuardado) 
                            .catch((err) => console.log("Error al guardar el objeto: " + err))
                            .then(() => console.log(`Se guardo tu objeto con id ${objeto.id}`))
                })    
    }
    async getById(numero){
        const ruta = `./${this.nombreArchivo}.JSON`
        await fs.promises
            .readFile(ruta, "utf-8")
                .catch((err)=>{console.log("Fallo la lectura del archivo: " + err)})
                .then((output) => JSON.parse(output))
                .then((contenido) => {
                    const objetoFiltrado = contenido.find(objetos => objetos.id = numero)
                    console.log(objetoFiltrado);
                })
    }
    async getAll(){
        const ruta = `./${this.nombreArchivo}.JSON`
        await fs.promises
            .readFile(ruta, "utf-8")
                .catch((err)=> console.log("Fallo la lectura del archivo: " + err))
                .then((output) => JSON.parse(output))
                .then((contenido) => console.log(contenido))
    }
    async deleteById(idAEliminar){
        const ruta = `./${this.nombreArchivo}.JSON`
        await fs.promises
            .readFile(ruta, "utf-8")
                .catch((err)=>{console.log("Fallo la lectura del archivo: " + err)})
                .then((output) => JSON.parse(output))
                .then(async (contenido) => {
                    const contenidoFiltrado = contenido.filter((objetos) => objetos.id != idAEliminar)
                    console.log(contenidoFiltrado);
                    const contenidoGuardado = JSON.stringify(contenidoFiltrado)
                    await fs.promises
                        .writeFile(ruta, contenidoGuardado) 
                            .catch((err) => {console.log("Error al guardar el objeto: " + err)})
                            .then(() => {console.log(`Se elimino tu objeto con id ${idAEliminar}`)})
                })    
    }
    deleteAll(){
        const ruta = `./${this.nombreArchivo}.JSON`
        const data = "[]"
        fs.promises.
            writeFile(ruta, data)
            .then(()=> {console.log(`Tu archivo ${this.nombreArchivo} se limpio correctamente`)})
            .catch((err)=> {console.log("Fallo la limpieza  del archivo: " + err)}) 
    }
}

const prueba = new Contenedor("productos")

const crearArchivo = () => prueba.innit()

const save = async (titulo, precio) => await prueba.save({titulo: `${titulo}`, price: precio})

const getById = async (numero) => await prueba.getById(numero)

const getAll = async () => await prueba.getAll()

const deleteById = async (id) => await prueba.deleteById(id)

const deleteAll = async () => await prueba.deleteAll()


crearArchivo()

// save("segundoejemplo", 222)

// getById(2)

// getAll()

// deleteById(2)

// deleteAll()



