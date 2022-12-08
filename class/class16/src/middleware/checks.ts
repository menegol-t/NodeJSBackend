import { Request, Response, NextFunction } from "express"

const requestInputCheck = (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.title || !req.body.price || !req.body.thumbnail){
        return res.status(401).json({msg: "Por favor completa los campos 'title', 'price', 'thumbnail', 'stock' y 'description'."})
    }else if(isNaN(req.body.price) || isNaN(req.body.stock)){
        return res.status(401).json({msg: "Los campos 'price' y 'stock' debe ser un numero."})
    }
    next()
}

const requestParamCheck = (req: Request, res: Response, next: NextFunction) => {
    if(!req.params.id){
        return res.status(401).json({msg: "Se requiere un ID del producto a modificar."})
    }
    next()
}

export {requestInputCheck, requestParamCheck}