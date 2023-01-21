import { Router, Response, Request } from "express";
import { checkLogIn } from "../middlewares/checkLogIn";

const  chatRoute = Router()

chatRoute.get("/", checkLogIn, async (req: Request, res: Response) => {    
    res.render("chatIndex", {msg: `Bienvenido ${req.session.info.username}`})
})

export default chatRoute