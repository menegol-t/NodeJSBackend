import { logger } from "../config/logger"

export const checkLogIn = (req: any, res: any, next: any) => {   
  if (!req.isAuthenticated()){
    logger.warn(!req.isAuthenticated())
    return res.redirect("/api/login") 
  }
  next()
}