const express = require("express")
const mainRouter = require("../routes/endpoints.js")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static("public"))
app.use("/api", mainRouter )

module.exports = app