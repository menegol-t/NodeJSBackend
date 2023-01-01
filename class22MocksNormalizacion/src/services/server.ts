import express, {Request, Response, ErrorRequestHandler, NextFunction} from "express"
import path from "path"
import endpoints from "../routes/endpoints"
import innitWebSocket from "./socket"
import * as util from "util"

const http = require("http")
const app = express()
const viewsFolderPath = path.resolve(__dirname, "../../views")
//IMPORTANT: Por algun motivo, cuando corres la version minimizada usando webpack, esta variable tiene que estar como path.resolve(__dirname, "../views").
//Pero si corres la version typescript, tiene que estar como  path.resolve(__dirname, "../../views")
const server = http.Server(app) 

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api", endpoints )

app.set("views", viewsFolderPath )
app.set("view engine", "pug")

app.get("/", async (req: Request, res: Response) =>{
    res.render("chatIndex")
})

const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).json({
        msg: "Unexpected error",
        error: util.inspect(err, true, 7, true)
    })
}

app.use(errorHandler)

innitWebSocket(server)

export default server