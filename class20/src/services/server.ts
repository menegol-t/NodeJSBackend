import express, {ErrorRequestHandler} from "express"
import mainRouter from "../routes/endpoints"
import http from "http"

const app = express()
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api", mainRouter)

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    return res.status(500).json({
        msg: "Unexpected error",
        error: err
    })
}

app.use(errorHandler)

const httpServer = new http.Server(app)
export default httpServer 