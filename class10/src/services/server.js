const express = require("express")
const path = require("path")
const app = express()
const endpoints = require("../routes/endpoints.js")
const viewsFolderPath = path.resolve(__dirname, "../../views")
// const fs = require("fs")

// const filePath = path.resolve(__dirname, "../../products.json")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.set("views", viewsFolderPath )
app.set("view engine", "pug")

app.get("/", (req, res) => {
	res.render("form")
})

app.get("/api/products", async (req, res) => {

	// const allData = await getAll(res)
	
	const allData = [{title: "asdknls", price: 333, thumbnail: "anfk"}]
		
    res.render("table", allData)
})

app.use("/api", endpoints )

// const getAll = async (res) => {
//     try{
//         return await fs.promises.readFile(filePath, "utf-8").then((output) => JSON.parse(output))
//     }catch(err){
//         if(err == 'SyntaxError: Unexpected end of JSON input'){
//             await fs.promises.writeFile(filePath, "[]") 
//             return []
//         }else{
//             return res.status(500).json({
//                 Err: `Error en la lectura del archivo error: ${err}`
//             })
//         }
//     }
// }

module.exports = app