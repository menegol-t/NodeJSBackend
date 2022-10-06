const fs = require('fs')

class Contenedor {
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo
        const ruta = `./${this.nombreArchivo}.JSON`
        const data = "[]"
        fs.promises.
            writeFile(ruta, data)
            .then(()=> {console.log(`Tu archivo ${this.nombreArchivo} se creo correctamente`)})
            .catch((err)=> {console.log("Fallo la creacion del archivo: " + err)}) 
    }
    save(objeto){
        const ruta = `./${this.nombreArchivo}.JSON`
        fs.promises
            .readFile(ruta, "utf-8")
                .catch((err)=>{console.log("Fallo la lectura del archivo: " + err)})
                .then((output) => JSON.parse(output))
                .then((contenido) => {

                    if(contenido.length === 0){
                        objeto.id = 1
                    }else{
                        objeto.id = contenido[contenido.lentgh - 1].id + 1
                    }

                    contenido.push(objeto)

                    const contenidoGuardado = JSON.stringify(contenido)

                    fs.promises
                    .writeFile(ruta, contenidoGuardado) 
                        .catch((err) => {console.log("Error al guardar el objeto: " + err)})
                        .then(() => {console.log(`Se guardo tu objeto con id ${objeto.id}`)})
                })    
    }
    getById(numero){
        const ruta = `./${this.nombreArchivo}.JSON`
        fs.promises
            .readFile(ruta, "utf-8")
                .catch((err)=>{console.log("Fallo la lectura del archivo: " + err)})
                .then((output) => JSON.parse(output))
                .then((contenido) => {
                    objetoFiltrado = contenido.filter(objetos => objetos.id = numero)
                    console.log(objetoFiltrado);
                })
    }
    getAll(){
        const ruta = `./${this.nombreArchivo}.JSON`
        fs.promises
            .readFile(ruta, "utf-8")
                .catch((err)=>{console.log("Fallo la lectura del archivo: " + err)})
                .then((output) => JSON.parse(output))
                .then((contenido) => {
                    console.log(contenido);
                })
    }
    deleteById(idAEliminar){
        const ruta = `./${this.nombreArchivo}.JSON`
        fs.promises
            .readFile(ruta, "utf-8")
                .catch((err)=>{console.log("Fallo la lectura del archivo: " + err)})
                .then((output) => JSON.parse(output))
                .then((contenido) => {
                    const contenidoFiltrado = contenido.filter((objetos) => objetos.id != contenido)
                    const contenidoGuardado = JSON.stringify(contenidoFiltrado)
                    fs.promises
                    .writeFile(ruta, contenidoGuardado) 
                        .catch((err) => {console.log("Error al guardar el objeto: " + err)})
                        .then(() => {console.log(`Se elimino tu objeto con id ${idAEliminar}`)})
                })    
    }
    deleteSAll(){
        const ruta = `./${this.nombreArchivo}.JSON`
        const data = "[]"
        fs.promises.
            writeFile(ruta, data)
            .then(()=> {console.log(`Tu archivo ${this.nombreArchivo} se limpio correctamente`)})
            .catch((err)=> {console.log("Fallo la limpieza  del archivo: " + err)}) 
    }
}

prueba = new Contenedor("productos")

prueba.save({titulo: "producto1", price: 123})

