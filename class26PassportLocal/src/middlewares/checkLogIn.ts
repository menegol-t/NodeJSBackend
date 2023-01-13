import { Request, Response, NextFunction } from "express";

export const checkLogIn = (req: Request, res: Response, next: NextFunction) => {  
  console.log(req.session);
  console.log("middlewares");
  console.log(req.user);
  
    
  if (!req.isAuthenticated()){
    return res.redirect("/api/login") 
  }
  next()
}