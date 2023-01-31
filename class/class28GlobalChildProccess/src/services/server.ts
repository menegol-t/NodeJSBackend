import express, {Request, Response, ErrorRequestHandler, NextFunction} from "express"
import path from "path"
import endpoints from "../routes/endpoints"
import innitWebSocket from "./socket"
import * as util from "util"
import session from "express-session"
import http from "http"
import "dotenv/config"
import {checkLogIn} from "../middlewares/checkLogIn"
import passport from "passport"
import {loginFunc, signUpFunc} from "./auth"
// import MongoStore from "connect-mongo"

const ttlSeconds = 600

const sessionOptions = {
// 	store: MongoStore.create({
//         mongoUrl: process.env.MONGO_ATLAS_SRV,
//         crypto: {secret: "dataEncriptadaEnLaDB"},
//     }),
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

const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).json({
        msg: "Unexpected error",
        error: util.inspect(err, true, 7, true)
    })
}

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use(session(sessionOptions))
app.use(passport.initialize())
app.use(passport.session())

passport.use("login", loginFunc)
passport.use("signup", signUpFunc)

app.set("views", viewsFolderPath )
app.set("view engine", "pug")

app.get("/", checkLogIn, async (req: Request, res: Response) =>{
    res.redirect("/api/chat")
})

innitWebSocket(server)

app.use("/api", endpoints)
app.use(errorHandler)

export default server