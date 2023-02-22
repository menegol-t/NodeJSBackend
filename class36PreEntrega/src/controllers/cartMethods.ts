import { NextFunction } from "express";
import { CartModel } from "../models/cartsModel";
import { ProductsModel } from "../models/prodsModel";
import { logger } from "../config/logger";
import* as utils from "util"

export const getCartByOwner = async (owner: string) => {
    try {
        return await CartModel.findOne({owner: owner, done: false})
    } catch (err) {
        logger.error(`Error al buscar cart por owner `, err)
        return false
    }
}

export const getProdsInsideCartOwner = async (ownerEmail: string) =>{
    try {
        const cart:any = await getCartByOwner(ownerEmail)
        if (cart == false) {
            return false
        } else {
            return cart.products
        }   
    } catch (err) {
        logger.error(`Errir ak ebcibtrar productos dentro de Cart por Owner `,err)
        return false
    }
}

const checkIfCartAlreaydCreated = async (ownerEmail: string, next: NextFunction) => {
    try {
        const cart = await CartModel.findOne({owner: ownerEmail, done: false})
        return cart
    } catch (err) {
        logger.error(`Error al chequear si el cart ya estaba creado `,err)
        next(err)
    }
}

export const createCartLogin = async (ownerEmail, next: NextFunction) => {
    try {
        const didUserAlreadyHaveACart = await checkIfCartAlreaydCreated(ownerEmail, next)

        if(didUserAlreadyHaveACart){
            return didUserAlreadyHaveACart
        }else{
            try{
                const newCart = await CartModel.create({products: [], owner: ownerEmail, done: false})
                return newCart
            }catch(err){
                logger.error(`Error al crear nuevo cart `, err)
                next(err)
            }
        }
    } catch (err) {
        logger.error(`Error al crear cart en el login `, err)
        next(err)
    }
}

export const finishCartByOwner = async (ownerEmail: string) => {
    try {       
        const cartToUpdate:any = await getCartByOwner(ownerEmail)        
        const {cartId} = cartToUpdate._id

        if(!cartToUpdate){
            logger.error("No se encontro ningun cart con ese ID")
            return false
        }else{
            const done = true
            const CartToBeFinished = await CartModel.findByIdAndUpdate(cartId, {done}, {new: true})
            return CartToBeFinished
        }

    } catch (err) {
        logger.error(`Error al finalizar compra `, err)
        return false
    }
}

export const addOrderToCart = async (order) => {
    try {
        const {owner, prodId} = order
        const prod = await ProductsModel.findById(prodId)
        const cartToUpdate:any = await getCartByOwner(owner)

        const {products} = cartToUpdate
        const cartId = cartToUpdate._id
        const indexOfDuplicatedItem = products.findIndex((itemInTheCart) => itemInTheCart._id == prodId)

        logger.info(`Los id de prodId es ${prodId} y de produycts[prod] es ${products[0]._id}`)
        logger.info(`esto me da un ${indexOfDuplicatedItem}`)

        if(!prod){
            logger.error("No se encontro ningun producto con ese ID")
            return false
        }else if(!cartToUpdate){
            logger.error("No se encontro ningun cart con ese ID")
            return false
        }else{ 
            
            if(indexOfDuplicatedItem !== -1){
                prod.quantity = prod.quantity + 1
                products[indexOfDuplicatedItem] = prod
            }else{
                products.push(prod)
            }

            await CartModel.findByIdAndUpdate(cartId, {products}, {new: true}, (err) => {
                err ? logger.error(err) : logger.info("ok mongoose")
            })
            return true
        }
    } catch (err) {
        logger.error(utils.inspect(err, true, 7, true))       
        return false
    }
}