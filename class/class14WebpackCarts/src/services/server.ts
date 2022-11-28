import express from "express"
import endpoints from "../routes/endpoints"

const Server = express()

Server.use(express.json())
Server.use(express.urlencoded({extended: true}))
Server.use(express.static("public"))
Server.use("/api", endpoints)

export default Server  