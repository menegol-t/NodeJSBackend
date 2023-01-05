import { Router, Response, Request } from "express";

const  loginRoute = Router()

const userList = [
    {
        username: "prueba",
        admin: true
    },
    {
        username: "test",
        admin: false
    }
]

loginRoute.get("/", async (req: Request, res: Response) => {
    res.render("login")
})

loginRoute.post("/", async (req: Request, res: Response) => {
    const {username} = req.body

    const indexOfUser = userList.findIndex((user) => user.username == username)

    if(indexOfUser < 0){        
        res.render("login", {invalidUser: `${username} is an invalid User. Try with "test"`})
    }else{
        const user = userList[indexOfUser]

        req.session.info = {
            loggedIn: true,
            username: user.username,
            admin: user.admin
        }

        res.redirect("/api/chat")
    }
})

export default loginRoute