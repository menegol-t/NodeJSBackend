import Config from "../config/config";

export const checkAdmin = (req, res, next) => {
    if (!Config.admin){
        return res.status(401).json({ err: -1, msg: "No estas autorizado." })
    }
    next()
}

 