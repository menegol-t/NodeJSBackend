import { Router, Response, Request } from "express";
import { logger } from "../config/logger";

const  profileRoute = Router()

profileRoute.get("/", async (req: any, res: Response) => {
    logger.info(req.user.phone)
    res.render("home.pug", {userData: req.user})
})

export default profileRoute