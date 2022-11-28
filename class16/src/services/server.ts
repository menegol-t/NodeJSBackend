import express, {Request, Response} from "express"
import path from "path"
import endpoints from "../routes/endpoints"
const innitWebSocket = require("./socket")
const DBServices = require("../controllers/DBMethods")

const messagesDb = new DBServices("messages")
const productsDb = new DBServices("products")

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
    res.render("index", {allData: await productsDb.get(), msgs: await messagesDb.get() })
})

innitWebSocket(server)

export default server