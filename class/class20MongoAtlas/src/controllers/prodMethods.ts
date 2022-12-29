import { Request, Response, NextFunction } from "express";
import { ProductsModel } from "../models/prodsModel";

// interface IObjectToUpdate {
//     name? : String
//     price? : number;
//     thumbnail?: string;
//     stock?: number;
//     description?: string;
// } Se explica mas abajo porque no se usa esta interfaz

export const getAllProd = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const prods = await ProductsModel.find()
        res.send(prods)

    } catch (err) {
        if(err instanceof Error){
            res.status(500).json({
                msg: `Get all products Error`,
                error: err
            })
        }else{
            next(err)
        }        
    }
}

export const getProdById = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const {productId} = req.params
        const prod = await ProductsModel.findById(productId)

        if(!prod){
            res.status(400).json({
                msg: "No se encontro ningun producto con ese ID"
            })
        }else{
            res.send(prod)
        }

    } catch (err) {
        if(err instanceof Error){
            res.status(500).json({
                msg: "Get product by ID error",
                error: err
            })
        }else{
            next(err)
        }        
    }
}

export const saveProd = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const {title, price, thumbnail, stock, description} = req.body
        const newProd = await ProductsModel.create({title, price, thumbnail, stock, description})
        res.send(`Succesfully saved ${newProd}`)

    } catch (err) {
        if(err instanceof Error){
            res.status(500).json({
                msg: "Save product error",
                error: err
            })
        }else{
            next(err)
        }        
    }
}

export const updateProd = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const {productId} = req.params
        const valuesToUpdate:any  = {} //Esto tendria la interfaz IObjectToUpdate pero a typescript no le gusta

        for(let [key, value] of Object.entries(req.body)){
            if(value !== undefined){
                valuesToUpdate[key] = value;
            }
        }
        
        const prodToUpdate = await ProductsModel.findByIdAndUpdate(
            productId,
            valuesToUpdate,
            {new: true}
        )

        res.send(`Update succesful: ${prodToUpdate}`)

    } catch (err) {
        if(err instanceof Error){
            res.status(500).json({
                msg: "Update product error",
                error: err
            })
        }else{
            next(err)
        }        
    }
}

export const deleteProd = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const {productId} = req.params
        await ProductsModel.findByIdAndDelete(productId)
        res.send(`Product with ID ${productId} deleted`)

    } catch (err) {
        if(err instanceof Error){
            res.status(500).json({
                msg: "Delete product error",
                error: err
            })
        }else{
            next(err)
        }        
    }
}