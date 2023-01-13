import { Request, Response, NextFunction } from "express";

declare module 'express-session' {
    interface SessionData {
      info: {
        loggedIn?: Boolean,
        username: String,
        admin: Boolean
      };
    }
}

export const checkLogIn = (req: Request, res: Response, next: NextFunction) => {    
  if (req.session.info == undefined){
    return res.redirect("/api/login") 
  }
  next()
}