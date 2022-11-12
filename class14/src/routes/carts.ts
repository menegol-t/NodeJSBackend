import { Router, Request, Response } from "express"; 
import Mehtods from "../controllers/cartMethods";
const { getCartById, createCart, deleteCartById, reqBodyCheck, addProdToCart } = Mehtods

const cartsRoute = Router()

cartsRoute.get("/:cartId/products", async (req:Request, res:Response)=>{

    const cartById = await getCartById(req.params.cartId)

    cartById ? res.send(cartById.products) :

    res.status(404).json({ Err: `Ningun carrito tiene id: ${req.params.cartId}`})
})

cartsRoute.post("/", async (req:Request, res:Response)=>{

    const newCart = await createCart()
    
    res.send(newCart)
})

cartsRoute.post("/:cartId/products", async (req:Request, res:Response)=>{
    //añade body.prod_id to cartId, requiere en el body un prod_id

    const checkProdIdExists = await reqBodyCheck(req)
    const addProdByIdToCart = await addProdToCart(req.params.cartId, req.body.productId)


    checkProdIdExists ? 
    res.send(checkProdIdExists) : 
    res.send(addProdByIdToCart)

})

cartsRoute.delete("/:cartId", async (req:Request, res:Response)=>{

    const cartToDelete = await deleteCartById(req.params.cartId)
    
    res.send(cartToDelete)
})

cartsRoute.delete("/:cartId/products/prodId", async (req:Request, res:Response)=>{
    //delte prod from cart
    res.json({msg: "ok"})
})

export default cartsRoute