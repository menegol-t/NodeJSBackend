import { Router, Response, Request } from "express";

const  homeRoute = Router()

homeRoute.get("/", async (req: any, res: Response) => {
    res.render("home.pug", {welcomeSign: `Hola, ${req.user.name}`})
})

export default homeRoute