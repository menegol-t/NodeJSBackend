const express = require("express")
const path = require("path")
const app = express()
const endpoints = require("../routes/endpoints.js")
const viewsFolderPath = path.resolve(__dirname, "../../views")
const http = require("http")
const {innitWebSocket} = require("./socket")
const { getAll } = require("../controllers/prodMethods")

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set("views", viewsFolderPath )
app.set("view engine", "pug")

app.get("/", async (req, res) => {
    res.render("index", {allData: await getAll(res)})
})

app.use("/api", endpoints )

const server = http.Server(app)

innitWebSocket(server)

module.exports = server 