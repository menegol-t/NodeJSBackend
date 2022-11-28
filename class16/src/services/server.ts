import express, {Request, Response} from "express"
import path from "path"
// import endpoints from "../routes/endpoints.ts"
import innitWebSocket from "./socket"
// import {get} from "../controllers/DB.ts"
const http = require("http")


const app = express()
const viewsFolderPath = path.resolve(__dirname, "../../views")
const server = http.Server(app)

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set("views", viewsFolderPath )
app.set("view engine", "pug")

app.get("/", (req: Request, res: Response) =>{
    res.json({msj:"ok"})
})

innitWebSocket(server)

export default server


