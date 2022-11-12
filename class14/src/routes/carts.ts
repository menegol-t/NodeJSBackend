import { Router, Request, Response } from "express"; 
import Mehtods from "../controllers/cartMethods";
import { checkAdmin } from "../middleware/auth";

const { getAllByCartId } = Mehtods

const cartsRoute = Router()

cartsRoute.get("/:cartId/products", async (req:Request, res:Response)=>{

    const cartById = await getAllByCartId(req.params.cartId)

    cartById ? res.send (cartById.products) :

    res.status(404).json({ Err: `Ningun carrito tiene id: ${req.params.cartId}`})
})

cartsRoute.post("/", async (req:Request, res:Response)=>{
    //crear cart y retorna CartID
    res.json({msg: "ok"})
})

cartsRoute.post("/:cartId/products", async (req:Request, res:Response)=>{
    //añade body.prod_id to cartId, requiere en el body un prod_id y amount

    
})

cartsRoute.delete("/:cartId", async (req:Request, res:Response)=>{
    //delete cart_id
    res.json({msg: "ok"})
})

cartsRoute.delete("/:cartId/products/prodId", async (req:Request, res:Response)=>{
    //delte prod from cart
    res.json({msg: "ok"})
})

export default cartsRoute