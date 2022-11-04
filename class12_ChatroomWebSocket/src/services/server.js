const express = require("express")
const path = require("path")
const app = express()
const endpoints = require("../routes/endpoints.js")
const viewsFolderPath = path.resolve(__dirname, "../../views")
const http = require("http")
const io = require("socket.io")

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set("views", viewsFolderPath )
app.set("view engine", "pug")

app.get("/", (req, res) => {
    res.render("index")
})

app.use("/api", endpoints )

const myHTTPServer = http.Server(app)

myWSServer = io(myHTTPServer)

module.exports = myHTTPServer 