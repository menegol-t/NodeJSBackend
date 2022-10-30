const express = require("express")
const {engine} = require("express-handlebars")

const path = require("path")
const viewsPath = path.resolve(__dirname, "../../views")
const layoutsPath = `${viewsPath}/layouts`

const app = express()

app.use(express.static("public"))
app.set("view engine", "handlebars")
app.set("views", viewsPath)

app.engine("handlebars", engine({
    layoutsDir: layoutsPath
}))

app.get("/", (req, res) => {
    res.render("main", {layout: "plantilla2"})
})

app.get("/test", (req, res) => {
    res.json({
        msg: "ok"
    })
})

module.exports = app