import express, {ErrorRequestHandler,Request, Response, NextFunction} from "express"
import mainRouter from "../routes/endpoints"
import http from "http"

const app = express()
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api", mainRouter)

const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).json({
        msg: "Unexpected error",
        error: err
    })
    next()
}

app.use(errorHandler)

const httpServer = new http.Server(app)
export default httpServer 