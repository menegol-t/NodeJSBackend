import { Router, Request, Response, NextFunction} from "express"; 
import {reqBody_ProdIdCheck} from "../middlewares/userInputChecks"
import { getAllCarts, getCartById, getProdsInsideCartId, createCart, deleteCartById, addProdToCart, deleteProdFromCart } from "../controllers/apiCartMethods"
import { checkAdmin } from "../middlewares/auth";
import { checkLogIn } from "../middlewares/checkLogIn";

const cartsRoute = Router()

cartsRoute.get("/", checkAdmin, getAllCarts)

cartsRoute.get("/:cartId", checkLogIn, async (req : Request, res : Response, next: NextFunction) => {
    const cart = await getCartById(req, res, next)
    res.send(cart)
})


cartsRoute.get("/:cartId/products", checkLogIn, getProdsInsideCartId)

cartsRoute.post("/", checkLogIn, createCart)

cartsRoute.post("/:cartId/products", checkLogIn, reqBody_ProdIdCheck, addProdToCart)

cartsRoute.delete("/:cartId", checkLogIn, deleteCartById)

cartsRoute.delete("/:cartId/products/", checkLogIn, reqBody_ProdIdCheck, deleteProdFromCart)

export default cartsRoute