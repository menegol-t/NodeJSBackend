const fs = require("fs")
const path = require("path")
const { Router } = require("express")

const filePath = path.resolve(__dirname, "../../products.json")

const usersRoute = Router()

usersRoute.get("/", async (request, response) => {
    const allData = await getAll(response)
    response.send(allData)
})

usersRoute.get("/:id", async (request, response) => {
    if(isNaN(request.params.id)){
        return response.status(400).json({
	        Err: "Se requiere un ID numerico del producto a modificar."
        })
    }
    
    const dataById = await getById(response, request.params.id)
    if(dataById == undefined){
        return response.status(404).json({
            Err: `Ninguno de los productos tiene id: ${request.params.id}`
        })
    }
    response.send(dataById)
})

usersRoute.post("/", async (request, response) => {
    console.log(request.body);

    const newProd = JSON.stringify(request.body)
    
    if(!request.body.title || !request.body.price || !request.body.thumbnail){
    	return response.status(400).json({
	        Err: "Por favor completa los campos 'title', 'price' y 'thumbnail'."
        })
    }else if(isNaN(request.body.price)){
        return response.status(400).json({
	        Err: "El campo 'price' debe ser un numero."
        })
    }
	
    newProductId = await save(response, request.body)
    response.send(`Se guardo tu producto: ${newProd} con id ${newProductId}`)
})

usersRoute.put("/:id", async (request, response) => {

    if(!request.body.title || !request.body.price || !request.body.thumbnail){
    	return response.status(400).json({
	        Err: "Por favor completa los campos 'title', 'price' y 'thumbnail'."
        })
    }else if(isNaN(request.body.price)){
        return response.status(400).json({
	        Err: "El campo 'price' debe ser un numero."
        })
    }
	
    if(isNaN(request.params.id)){
        return response.status(400).json({
	        Err: "Se requiere un ID numerico del producto a modificar."
        })
    }

    const dataById = await getById(response, request.params.id)

    const newProd = JSON.stringify(request.body)

    if(dataById == undefined){
        newProductId = await save(response, request.body)
        response.send(`Se creo tu producto: ${newProd} con id ${newProductId}`)
    }else{
        updatedProductId = await update(response, request.body, dataById)
        response.send(`Se guardaron los siguientes cambios: ${newProd} \n En tu producto con ID ${updatedProductId}`)
    }
})

usersRoute.delete("/:id", async (request, response) => {
    if(isNaN(request.params.id)){
        return response.status(400).json({
	        Err: "Se requiere un ID numerico del producto a modificar."
        })
    }
    const idDelete = await deleteById(response, request.params.id)
    response.send(`Se elimino exitosamente tu producto con ID ${idDelete} `)
})

module.exports = usersRoute

//METODOS:

const getAll = async (res) => {
    try{
        return await fs.promises.readFile(filePath, "utf-8").then((output) => JSON.parse(output))
    }catch(err){
        if(err == 'SyntaxError: Unexpected end of JSON input'){
            await fs.promises.writeFile(filePath, "[]") 
            return []
        }else{
            return res.status(500).json({
                Err: `Error en la lectura del archivo error: ${err}`
            })
        }
    }
}

const getById = async (res, id) => {
    try{
        return await fs.promises.readFile(filePath, "utf-8").then((output) => JSON.parse(output))
            .then((contenido) => {
                const objetoFiltrado = contenido.find(objetos => objetos.id == id)
                return objetoFiltrado
            })
    }catch(err){
        return res.status(500).json({
            Err: `Algo salio mal al buscar por ID, error: ${err}`
        })
    }
}

const save = async (res, obj) => {
    try{
        return await fs.promises.readFile(filePath, "utf-8").then((availableProd) => JSON.parse(availableProd))
            .then(async (availableProd) => {

                if(availableProd.length === 0){
                    obj.id = 1
                }else{
                    obj.id = availableProd[availableProd.length - 1].id + 1
                }

                availableProd.push(obj)
                const addAvailableProd = JSON.stringify(availableProd)

                try{
                    return await fs.promises.writeFile(filePath, addAvailableProd).then(() => {return obj.id})
                }catch(err){
                    return res.status(500).json({
                        Err: `Algo salio mal al sobreescribir el archivo, error: ${err}`
                    })
                }           
            })
    }catch(err){
        return res.status(500).json({
            Err: `Algo salio mal al guardar el archivo, error: ${err}`
        })
    }
}

const update = async (res, newObj, oldObj) => {
    newObj.id = oldObj.id

    const completeProds = await getAll(res)
    const index = completeProds.findIndex(newObjToUpdate => newObjToUpdate.id == oldObj.id) 
    completeProds[index] = newObj
    const updatedList = JSON.stringify(completeProds)

    try{
        return await fs.promises.writeFile(filePath, updatedList).then(() => {return newObj.id})
    }catch(err){
        return res.status(500).json({
            Err: `Algo salio mal al sobreescribir el archivo, error: ${err}`
        })
    } 
}

const deleteById = async (res, idToDelete) => {
    try{
        return await fs.promises.readFile(filePath, "utf-8").then((output) => JSON.parse(output))
            .then(async (content) => {
                const contentFiltered = content.filter((obj) => obj.id != idToDelete)
                const contentSaved = JSON.stringify(contentFiltered)
                try{
                    return await fs.promises.writeFile(filePath, contentSaved).then(() => {return idToDelete})
                }catch(err){
                    return res.status(500).json({
                        Err: `Algo salio mal al eliminar el producto, error: ${err}`
                    })
                }                 
            })
    }catch(err){
        return res.status(500).json({
            Err: `Algo salio mal al buscar el producto a eliminar, error: ${err}`
        })
    }
}

// const requestInputCheck = (req, res) => {
//     if(!req.body.title || !req.body.price || !req.body.thumbnail){
//     	return res.status(400).json({
// 	        Err: "Por favor completa los campos 'title', 'price' y 'thumbnail'."
//         })
//     }else if(isNaN(req.body.price)){
//         return res.status(400).json({
// 	        Err: "El campo 'price' debe ser un numero."
//         })
//     }
// }

// const requestParamCheck = (req, res) => {
//     if(isNaN(req.params.id)){
//         return res.status(400).json({
// 	        Err: "Se requiere un ID numerico del producto a modificar."
//         })
//     }
// }