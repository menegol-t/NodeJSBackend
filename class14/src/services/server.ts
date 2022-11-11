import express from "express"
import {Router, Request, Response} from "express"

const Server = express()

Server.use(express.json())
Server.use(express.urlencoded({extended: true}))

Server.use(express.static("public"))
Server.get("/", (req:Request, res:Response) =>{
    res.json({msg: "ok"})
})


export default Server