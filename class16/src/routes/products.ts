import { Router, Request, Response, response } from "express";
const DBServices = require("../controllers/DBMethods")
import {requestInputCheck, requestParamCheck} from "../middleware/checks"

const productsRoute = Router()

const dBProducts = new DBServices("products")

productsRoute.get("/", async (req: Request, res: Response) => {
    res.redirect("/")
})

productsRoute.get("/:id", requestParamCheck, async (req: Request, res: Response) => {
    res.send(await dBProducts.get(req.params.id))
    //no id existe
})

productsRoute.post("/", requestInputCheck, async (req: Request, res: Response) => {
    const body = req.body
    await dBProducts.save(body).then(()=> res.redirect("api/products"))
})

productsRoute.put("/:id", requestInputCheck, requestParamCheck, async (req: Request, res: Response) => {
    //no id existe
    res.send(await dBProducts.update(req.params.id, req.body))
})

productsRoute.delete("/:id", requestParamCheck, async (req: Request, res: Response) => {
    await dBProducts.delete(req.params.id)
    res.send(`Se elimino el producto ${req.params.id}`)
})

export default productsRoute