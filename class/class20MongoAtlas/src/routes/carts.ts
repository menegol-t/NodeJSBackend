import { Router, Request, Response, NextFunction} from "express"; 
import {reqBody_ProdIdCheck} from "../middleware/userInputChecks"
import { getAllCarts, getCartById, getProdsInsideCartId, createCart, deleteCartById, addProdToCart, deleteProdFromCart } from "../controllers/cartMethods"

const cartsRoute = Router()

cartsRoute.get("/", getAllCarts)

cartsRoute.get("/:cartId", async (req : Request, res : Response, next: NextFunction) => {
    
    const cart = await getCartById(req, res, next)

    res.send(cart)
})


cartsRoute.get("/:cartId/products", getProdsInsideCartId)

cartsRoute.post("/", createCart)

cartsRoute.post("/:cartId/products", reqBody_ProdIdCheck, addProdToCart)

cartsRoute.delete("/:cartId", deleteCartById)

cartsRoute.delete("/:cartId/products/", reqBody_ProdIdCheck, deleteProdFromCart)

export default cartsRoute