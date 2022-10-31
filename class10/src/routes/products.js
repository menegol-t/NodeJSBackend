const fs = require("fs")
const path = require("path")
const { Router } = require("express")

const usersRoute = Router()

const filePath = path.resolve(__dirname, "../../products.json")

usersRoute.get("/", async (request, response) => {
    
    const allData = [{title: "asdknls", price: 333, thumbnail: "anfk"}]

    // const allData = await getAll(response)
    
    await response.render("table", allData)
})

usersRoute.get("/:id", async (request, response) => {

    const Err =  await requestParamCheck(request)

    const dataById = await getById(response, request.params.id)

    Err ? response.status(400).json({Err}) : 
    
    dataById ? response.send(dataById) : 
    
    response.status(404).json({ Err: `Ninguno de los productos tiene id: ${request.params.id}`}) 
    
})

usersRoute.post("/", async (request, response) => {

    const err = await requestInputCheck(request)

    const body = request.body

    err ? response.status(400).json({err}) : await save(response, body)
    
    await response.redirect("/api/products")
})

usersRoute.put("/:id", async (request, response) => {

    const ErrBody = await requestInputCheck(request)

    const ErrParam = await requestParamCheck(request)

    const dataById = await getById(response, request.params.id)

    ErrBody ? response.status(400).json({ErrBody}) : 
    
    ErrParam ? response.status(400).json({ErrParam}) : 
    
    dataById ? 
    
    response.send(`Se guardaron los siguientes cambios: ${JSON.stringify(request.body)} \n En tu producto con ID ${await update(response, request.body, dataById)}`) :

    response.send(`Se creo tu producto: ${JSON.stringify(request.body)} con id ${await save(response, request.body)}`)
        
    }
)

usersRoute.delete("/:id", async (request, response) => {

    const ErrParam = await requestParamCheck(request)

    const dataToDelete = await deleteById(response, request.params.id)

    ErrParam ? response.status(400).json({ErrParam}) : 
    
    response.send(`Se elimino exitosamente tu producto con ID ${dataToDelete} `)
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
            .then((contenido) => { return contenido.find(objetos => objetos.id == id)})

    }catch(err){ return res.status(500).json({Err: `Algo salio mal al buscar por ID, error: ${err}`}) }
}

const save = async (res, obj) => {
    try{

        return await fs.promises.readFile(filePath, "utf-8").then((availableProd) => JSON.parse(availableProd))
        
            .then(async (availableProd) => {

                availableProd.length === 0 ? 
                
                obj.id = 1 : 
                
                obj.id = availableProd[availableProd.length - 1].id + 1

                availableProd.push(obj)

                try{

                    return await fs.promises.writeFile(filePath, JSON.stringify(availableProd)).then(() => {return obj.id})

                }catch(err){ return res.status(500).json({Err: `Algo salio mal al sobreescribir el archivo, error: ${err}`}) }           
            })

    }catch(err){ return res.status(500).json({Err: `Algo salio mal al guardar el archivo, error: ${err}`}) }
}

const update = async (res, newObj, oldObj) => {

    newObj.id = oldObj.id

    const completeProds = await getAll(res)

    const index = completeProds.findIndex(newObjToUpdate => newObjToUpdate.id == oldObj.id) 

    completeProds[index] = newObj

    try{

        return await fs.promises.writeFile(filePath, JSON.stringify(completeProds)).then(() => {return newObj.id})

    }catch(err){ return res.status(500).json({Err: `Algo salio mal al sobreescribir el archivo, error: ${err}`}) } 
}

const deleteById = async (res, idToDelete) => {

    try{

        return await fs.promises.readFile(filePath, "utf-8").then((output) => JSON.parse(output))

            .then(async (content) => {

                const contentFiltered = content.filter((obj) => obj.id != idToDelete) 

                try{

                    return await fs.promises.writeFile(filePath, JSON.stringify(contentFiltered)).then(() => {return idToDelete})

                }catch(err){ return res.status(500).json({Err: `Algo salio mal al eliminar el producto, error: ${err}`}) }                 
            })

    }catch(err){ return res.status(500).json({Err: `Algo salio mal al buscar el producto a eliminar, error: ${err}`}) }
}

const requestInputCheck = async (req) => {

    if(!req.body.title || !req.body.price || !req.body.thumbnail){

    	return "Por favor completa los campos 'title', 'price' y 'thumbnail'."

    }else if(isNaN(req.body.price)){

        return "El campo 'price' debe ser un numero."
        
    }else{return undefined}
}

const requestParamCheck = async (req) => {

    if(isNaN(req.params.id)){

        return "Se requiere un ID numerico del producto a modificar."

    }else{return undefined}
}