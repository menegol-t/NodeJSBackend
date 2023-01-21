import express, {Request, Response, ErrorRequestHandler, NextFunction} from "express"
import path from "path"
import endpoints from "../routes/endpoints"
import innitWebSocket from "./socket"
import * as util from "util"
import cookieParser from "cookie-parser"
import session from "express-session"
import MongoStore from "connect-mongo"
import http from "http"
import "dotenv/config"
import {checkLogIn} from "../middlewares/checkLogIn"

const ttlSeconds = 120

const StoreOptions = {
	store: MongoStore.create({
        mongoUrl: process.env.MONGO_ATLAS_SRV,
        crypto: {secret: "dataEncriptadaEnLaDB"},
    }),
    secret: "shhhhhhhhhhh",
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: {maxAge: ttlSeconds * 1000}
}

const app = express()
const viewsFolderPath = path.resolve(__dirname, "../../views")
//IMPORTANT: Por algun motivo, cuando corres la version minimizada usando webpack, esta variable tiene que estar como const viewsFolderPath = path.resolve(__dirname, "../views").
//Pero si corres la version typescript, tiene que estar como const viewsFolderPath = path.resolve(__dirname, "../../views")
const server = new http.Server(app) 

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session(StoreOptions))
app.use("/api", endpoints )

app.set("views", viewsFolderPath )
app.set("view engine", "pug")

app.get("/", checkLogIn, async (req: Request, res: Response) =>{
    res.redirect("/api/chat")
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