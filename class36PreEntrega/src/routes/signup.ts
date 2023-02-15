import { Router, Response, Request, NextFunction } from "express";
import passport from "passport";
import { logger } from "../config/logger";

const  signupRoute = Router()

const passportOptions = {failureMessage: "Hubo un problema con tu email o password."}

signupRoute.get("/", async (req: Request, res: Response) => {
    res.render("signup.pug")
})

signupRoute.post("/", async (req:Request, res:Response, next:NextFunction) => {
    passport.authenticate("signup", passportOptions, (err, user, info) => {
        if(err){
            logger.error(err)
            return next(err)
        }else if(!user){
            return res.render("signup.pug", {error: info.message})
        }else{
            res.render("login.pug", {invalidUser: "Perfecto! Ahora logueate con tus nuevas credenciales."})
        }
    })(req, res, next)
})

export default signupRoute 