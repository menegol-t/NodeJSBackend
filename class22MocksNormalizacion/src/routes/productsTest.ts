import { Router, Response, Request } from "express";
import randomProd from "../controlers/fakeController"

const  productsTestRoute = Router()

productsTestRoute.get("/", async (req: Request, res: Response) => {
    res.render("prodIndex", {allData: await randomProd()})
})

export default productsTestRoute