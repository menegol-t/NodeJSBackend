const { Router } = require("express")
const { getAll, getById, save, update, deleteById, requestInputCheck, requestParamCheck } = require("../controllers/prodMethods")

const usersRoute = Router()

usersRoute.get("/", async (request, response) => {
    
    response.redirect("/")
    // response.render("index", {allData: await getAll(response)})
    
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