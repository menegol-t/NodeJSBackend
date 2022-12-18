import Config from "../config/config";
import { Request, Response, NextFunction } from "express";

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!Config.admin){
        return res.status(401).json({ err: -1, msg: "No estas autorizado." })
    }
    next()
}