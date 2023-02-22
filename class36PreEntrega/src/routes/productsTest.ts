import { Router, Response, Request } from "express";
import randomProd from "../controllers/fakeController"
import { checkLogIn } from "../middlewares/checkLogIn";

const  productsTestRoute = Router()

productsTestRoute.get("/", checkLogIn,  async (req: Request, res: Response) => {
    res.render("prodIndex.pug", {prodData: await randomProd()})
})

export default productsTestRoute