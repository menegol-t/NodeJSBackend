import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from 'uuid'
import { Request } from "express"

const filePath = path.resolve(__dirname, "../../products.json")

interface Product {
    id ?: string,
    timestamp : string
}

const getAll = async () => {
    try{
        return await fs.promises.readFile(filePath, "utf-8").then((output) => JSON.parse(output))
    }catch(err){
        if(err == 'SyntaxError: Unexpected end of JSON input'){
            await fs.promises.writeFile(filePath, "[]") 
            return []
        }else{
            return {
                Err: `Error en la lectura del archivo error: ${err}`
            }
        }
    }
}

const getById = async (id: string) => {
    try{

        return await fs.promises.readFile(filePath, "utf-8").then((output) => JSON.parse(output))
            .then((contenido) => { return contenido.find(objetos => objetos.id == id)})

    }catch(err){ return {Err: `Algo salio mal al buscar por ID, error: ${err}`} }
}

const save = async (obj : Product) => {
    try{

        return await fs.promises.readFile(filePath, "utf-8").then((availableProd) => JSON.parse(availableProd))
        
            .then(async (availableProd) => {

                // availableProd.length === 0 ? 
                
                // obj.id = 1 : 
                
                // obj.id = availableProd[availableProd.length - 1].id + 1

                obj.id = uuidv4()

                obj.timestamp = new Date().getDay() + "/" +  new Date().getMonth() + ", " + new Date().getHours() + ":" + new Date().getMinutes() + "hs" 

                availableProd.push(obj)

                try{

                    return await fs.promises.writeFile(filePath, JSON.stringify(availableProd)).then(() => {return obj.id})

                }catch(err){ return {Err: `Algo salio mal al sobreescribir el archivo, error: ${err}`} }           
            })

    }catch(err){ return {Err: `Algo salio mal al guardar el archivo, error: ${err}`} }
}

const update = async (newObj : Product, oldObj : Product) => {

    newObj.id = oldObj.id

    const completeProds = await getAll()

    const index = completeProds.findIndex(newObjToUpdate => newObjToUpdate.id == oldObj.id) 

    completeProds[index] = newObj

    try{

        return await fs.promises.writeFile(filePath, JSON.stringify(completeProds)).then(() => {return newObj.id})

    }catch(err){ return {Err: `Algo salio mal al sobreescribir el archivo, error: ${err}`} } 
}

const deleteById = async (idToDelete: string) => {

    try{

        return await fs.promises.readFile(filePath, "utf-8").then((output) => JSON.parse(output))

            .then(async (content) => {

                const contentFiltered = content.filter((obj) => obj.id != idToDelete) 

                try{

                    return await fs.promises.writeFile(filePath, JSON.stringify(contentFiltered)).then(() => {return idToDelete})

                }catch(err){ return {Err: `Algo salio mal al eliminar el producto, error: ${err}`} }                 
            })

    }catch(err){ return {Err: `Algo salio mal al buscar el producto a eliminar, error: ${err}`} }
}

const requestInputCheck = async (req : Request) => {

    if(!req.body.title || !req.body.price || !req.body.thumbnail || !req.body.stock || !req.body.description){

    	return "Por favor completa los campos 'title', 'price', 'thumbnail', 'stock' y 'description'."

    }else if(isNaN(req.body.price) || isNaN(req.body.stock)){

        return "Los campos 'price' y 'stock' debe ser un numero."
        
    }else{return undefined}
}

const requestParamCheck = async (req : Request) => {

    if(!req.params.id){

        return "Se requiere un ID del producto a modificar."

    }else{return undefined}
}

export default {
    getAll,
    getById,
    save,
    update,
    deleteById,
    requestInputCheck,
    requestParamCheck
}