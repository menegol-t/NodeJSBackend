import { Router, Response, Request, NextFunction } from "express";
import passport from "passport";
import { logger } from "../config/logger";

const  loginRoute = Router()

loginRoute.get("/", async (req: Request, res: Response) => {
    res.render("login.pug")
})

// loginRoute.post("/", passport.authenticate("login", {failureRedirect: "/api/login"}), async (req: Request, res: Response) => {
//     res.redirect("/api/chat")
// })

// loginRoute.post("/", async (req:Request, res:Response, next:NextFunction) => {
//     await passport.authenticate("login", async (err, user, info) => {
//         if(err){
//             logger.error(err)
//             return next(err)
//         }else if(!user){
//             logger.warn(err)
//             res.render("login.pug", {invalidUser: info.message})
//         }else{
//              res.redirect("/api/chat")
//         }
//     })(req, res, next)
// })

loginRoute.post("/", (req:Request, res:Response, next:NextFunction) => {
    passport.authenticate("login", async (err, user, info) => {
        if(err){
            logger.error(err)
            return next(err)
        }else if(!user){
            logger.warn(err)
            return res.render("login.pug", {invalidUser: info.message})
        }else{
            req.logIn(user, (err) => {
                if (err) { return next(err); }
                return res.redirect("/api/chat");
            });
        }
    })(req, res, next);
})

export default loginRoute