class Usuario {
    constructor(nombre, apellido){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = []
        this.mascotaS = []
    }
    getFullName(){
        console.log(`Hola soy ${this.nombre} ${this.apellido}`);
    }
    addMascota(mascota){
        this.mascotaS.push(`${mascota}`)
    }
    countMascotas(){
        console.log(this.mascotaS.length)
    }
    addBook(titulo, escritor){
        this.libros.push({nombre: titulo, autor: escritor})
    }
    getBookNames(){
        console.log(this.libros.map((libritos) => libritos.nombre ))
    }
}

prueba = new Usuario("tom", "menegol")

prueba.getFullName()

prueba.addMascota("michi")

prueba.addMascota("firulai")

console.log(prueba.mascotaS);

prueba.countMascotas()

prueba.addBook("harry potter","JK Rowling")

prueba.addBook("dune","Frank Helbert")

console.log(prueba.libros);

prueba.getBookNames()



