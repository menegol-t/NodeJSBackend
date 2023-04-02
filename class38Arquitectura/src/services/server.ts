import express, {Request, Response, ErrorRequestHandler, NextFunction} from "express"
import session from "express-session"
import path from "path"
import endpoints from "../routes/endpoints"
import * as util from "util"
import http from "http"
import "dotenv/config"
import {checkLogIn} from "../middlewares/checkLogIn"
import passport from "passport"
import {loginFunc, signUpFunc} from "./auth"
import compression from "compression"
import { logger } from "../config/logger"
import initWebSocket from "./socket"
import helmet from "helmet"

const ttlSeconds = 600

const sessionOptions = {
    secret: "shhhhhhhhhhh",
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: {maxAge: ttlSeconds * 1000}
}

const app = express()

const viewsFolderPath = path.resolve(__dirname, "../views")
//IMPORTANT: Por algun motivo, cuando corres la version minimizada usando webpack, esta variable tiene que estar como const viewsFolderPath = path.resolve(__dirname, "../views").
//Pero si corres la version typescript, tiene que estar como const viewsFolderPath = path.resolve(__dirname, "../../views")

const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(util.inspect(err, true, 7, true))
    return res.status(500).json({
        msg: "Unexpected error",
        err
    })
}

app.use(helmet())
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(compression())

app.use(session(sessionOptions))
app.use(passport.initialize())
app.use(passport.session())

app.use(async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`PID: ${process.pid}, Route ${req.method} ${req.url} requested.`)
    next()
})

passport.use("login", loginFunc)
passport.use("signup", signUpFunc)

app.set("views", viewsFolderPath )
app.set("view engine", "pug")

app.get("/", checkLogIn, async (req: Request, res: Response) => {    
    res.redirect("/api/home")
})

app.use("/api", endpoints)
app.use(errorHandler)

app.get('*', async (req: Request, res: Response) => {
    logger.warn(`PID: ${process.pid}, Route ${req.method} ${req.url} doesn't exist.`)
    res.status(400).redirect("/")
})

const server = new http.Server(app)

initWebSocket(server)

export default server