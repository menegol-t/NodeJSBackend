import { Router, Response, Request } from "express";
import { checkLogIn } from "../middlewares/checkLogIn";

const  logoutRoute = Router()

logoutRoute.get("/", checkLogIn, async (req: Request, res: Response) => {
    const {username} = req.session.info
    req.session.destroy((err) => {
		if(!err){
		    res.render("logout", {goodbyeMsg: `Nos vemos ${username}`})
        }else{
            console.log(`Error saving Message to mongo`);
            console.log(err);
        }
    })
})

export default logoutRoute