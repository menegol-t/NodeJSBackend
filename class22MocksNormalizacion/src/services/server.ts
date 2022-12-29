import express, {Request, Response} from "express"
import path from "path"
import endpoints from "../routes/endpoints"
import innitWebSocket from "./socket"

const http = require("http")
const app = express()
const viewsFolderPath = path.resolve(__dirname, "../../views")
const server = http.Server(app)

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api", endpoints )

app.set("views", viewsFolderPath )
app.set("view engine", "pug")

app.get("/", async (req: Request, res: Response) =>{
    res.send("todo ok")
    // res.render("index", {allData: await ACA VA LA FUNCION QUE TRAE TODO DE MONGO, 
    // msgs: await OTRA FUNCION QUE TRAE OTRO DE MONGO })
})

innitWebSocket(server)

export default server