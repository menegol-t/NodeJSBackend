import { Router, Response, Request } from "express";
import { checkLogIn } from "../middlewares/checkLogIn";

const  logoutRoute = Router()

logoutRoute.get("/", checkLogIn, async (req: any, res: Response) => {
    const {email} = req.user

    req.logout((err) => {
		if(!err){
		    res.render("logout", {goodbyeMsg: `Nos vemos ${email}`})
        }else{
            console.log(`Error login out`);
            console.log(err);
        }
    })
})

export default logoutRoute