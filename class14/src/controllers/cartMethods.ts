import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from 'uuid'
import { Request } from "express"

const filePath = path.resolve(__dirname, "../../carts.json")

interface NewCart {
    id: string,
    timestamp: string,
    products: []
}

//crea cart, return cartid
//añade productId to CartId (requiree body con prod_id)
//get all prod from cart id
//borra cart con cart_id
//borra prodId from CartId

const getAllByCartId = async (id: string) => {
    try{
        return await fs.promises.readFile(filePath, "utf-8").then((output) => JSON.parse(output))
            .then((content) => { return content.find(carts => carts.id == id)})

    }catch(err){ return {Err: `Algo salio mal al buscar cart por ID, error: ${err}`} }
}

const createCart = async () => {
    try{

        return await fs.promises.readFile(filePath, "utf-8").then((cartsJson) => JSON.parse(cartsJson))
        
            .then(async (cartsJson) => {

                const newCart: NewCart = {
                    id:  uuidv4(),
                    timestamp: new Date().getDay() + "/" +  new Date().getMonth() + ", " + new Date().getHours() + ":" + new Date().getMinutes() + "hs",
                    products: []
                } 

                cartsJson.push(newCart)

                try{

                    return await fs.promises.writeFile(filePath, JSON.stringify(cartsJson)).then(() => {return `Se creo tu cart con ID: ${newCart.id}`})

                }catch(err){ return {Err: `Algo salio mal al sobreescribir el archivo, error: ${err}`} }           
            })

    }catch(err){ return {Err: `Algo salio mal al guardar el archivo, error: ${err}`} }
}

// const update = async (newObj : Product, oldObj : Product) => {

//     newObj.id = oldObj.id

//     const completeProds = await getAll()

//     const index = completeProds.findIndex(newObjToUpdate => newObjToUpdate.id == oldObj.id) 

//     completeProds[index] = newObj

//     try{

//         return await fs.promises.writeFile(filePath, JSON.stringify(completeProds)).then(() => {return newObj.id})

//     }catch(err){ return {Err: `Algo salio mal al sobreescribir el archivo, error: ${err}`} } 
// }

const deleteCartById = async (idToDelete: string) => {

    try{

        return await fs.promises.readFile(filePath, "utf-8").then((cartsJson) => JSON.parse(cartsJson))

            .then(async (cartsJson) => {

                const cartsJsonFiltered = cartsJson.filter((carts) => carts.id != idToDelete) 

                try{

                    return await fs.promises.writeFile(filePath, JSON.stringify(cartsJsonFiltered)).then(() => {return `Se borro tu cart con ID ${idToDelete}`})

                }catch(err){ return {Err: `Algo salio mal al eliminar el producto, error: ${err}`} }                 
            })

    }catch(err){ return {Err: `Algo salio mal al buscar el producto a eliminar, error: ${err}`} }
}

const reqBodyCheck = async (req : Request) => {

    return !req.body.productId ? 
    
    "Por favor completa el campo 'productId' en el body para añadir ese producto al carrito." : 
    
    undefined
}

export default {
    getAllByCartId,
    createCart,
    deleteCartById
}