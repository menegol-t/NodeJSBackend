import { Router, Response, Request, NextFunction } from "express";
import passport from "passport";
import { logger } from "../config/logger";

const  loginRoute = Router()

loginRoute.get("/", async (req: Request, res: Response) => {
    res.render("login.pug")
})

loginRoute.post("/", (req:Request, res:Response, next:NextFunction) => {
    passport.authenticate("login", async (err, user, info) => {
        if(err){
            logger.error(err)
            return next(err)
        }else if(!user){
            logger.warn(err)
            return res.status(400).render("login.pug", {invalidUser: info.message})
        }else{
            req.logIn(user, (err) => {err ? next(err) : res.status(200).redirect("/api/home")});
        }
    })(req, res, next);
})

export default loginRoute