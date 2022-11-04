const express = require("express")
const path = require("path")
const app = express()
const endpoints = require("../routes/endpoints.js")
const viewsFolderPath = path.resolve(__dirname, "../../views")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.set("views", viewsFolderPath )
app.set("view engine", "pug")

app.get("/", (req, res) => {
	res.render("form")
})

app.use("/api", endpoints )

module.exports = app