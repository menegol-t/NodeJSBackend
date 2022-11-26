import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from 'uuid'
import { Request } from "express"
import prodMethods from "./prodMethods"
const {getById} = prodMethods

const filePath = path.resolve(__dirname, "../carts.json")

interface NewCart {
    id: string,
    timestamp: string,
    products: []
}

const getAllCarts = async() => {
    try{
        return await fs.promises.readFile(filePath, "utf-8").then((output) => JSON.parse(output))
            .then((content) => { return content})

    }catch(err){ return {Err: `Algo salio mal al traer todos los cart ${err}`} }
}

const getCartById = async (id: string) => {
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

const addProdToCart = async (cartId: string, prodId: string) => {

    const allCarts = await getAllCarts()

    const cartToUpdate = await getCartById(cartId)

    const itemToAdd = await getById(prodId)

    if(cartToUpdate.products == undefined){
        return "Ese ID no pertenece a ningun cart."
    }else if(!itemToAdd){
        return "Ese ID no pertenece a ningun producto."
    }else{

        const indexCartToReplace = allCarts.map(obj => obj.id).indexOf(cartId)

        const prodToUpdate = cartToUpdate.products

        prodToUpdate.push(itemToAdd)

        cartToUpdate.products = prodToUpdate

        allCarts[indexCartToReplace] = cartToUpdate

        try{

            return await fs.promises.writeFile(filePath, JSON.stringify(allCarts)).then(() => {return `Se añadio ${itemToAdd.title} a tu cart con ID: ${cartToUpdate.id}`})

        }catch(err){ return {Err: `Algo salio mal al sobreescribir el archivo, error: ${err}`} }
    }        
}

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

const deleteProdFromCart = async (cartId: string, prodId: string) => {

    const allCarts = await getAllCarts()

    const cartToUpdate = await getCartById(cartId)

    const itemToDelete = await getById(prodId)
    
    if(cartToUpdate.products == undefined){
        return "Ese ID no pertenece a ningun cart."
    }else if(!itemToDelete){
        return "Ese ID no pertenece a ningun producto."
    }else{
        
        const updatedProd = cartToUpdate.products.filter((prod) => prod.id != itemToDelete.id)

        cartToUpdate.products = updatedProd

        const indexCartToReplace = allCarts.map(obj => obj.id).indexOf(cartId)

        allCarts[indexCartToReplace] = cartToUpdate

        try{

            return await fs.promises.writeFile(filePath, JSON.stringify(allCarts)).then(() => {return `Se elimino ${itemToDelete.title} de tu cart con ID: ${cartToUpdate.id}`})

        }catch(err){ return {Err: `Algo salio mal al sobreescribir el archivo, error: ${err}`} }
    }        
}

const reqBodyCheck = async (req : Request) => {

    if(!req.body.productId){
        return "Por favor completa el campo 'productId' en el body para añadir ese producto al carrito."
    }else{
        return undefined
    }
}

export default {
    getCartById,
    createCart,
    deleteCartById,
    reqBodyCheck,
    addProdToCart,
    deleteProdFromCart
}