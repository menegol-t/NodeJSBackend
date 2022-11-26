import { Router, Request, Response } from "express";
import Methods from "../controllers/prodMethods";
import { checkAdmin } from "../middleware/auth"

const {
    getAll,
    getById, 
    save, 
    update, 
    deleteById,
    requestInputCheck,
    requestParamCheck
} = Methods

const prodsRoute = Router()

prodsRoute.get("/", async (request : Request, response : Response) => {
    
    const allData = await getAll()

    response.send(allData)
})

prodsRoute.get("/:id", async (request : Request, response : Response) => {

    const Err =  await requestParamCheck(request)

    const dataById = await getById(request.params.id)

    Err ? response.status(400).json({Err}) : 
    
    dataById ? response.send(dataById) : 
    
    response.status(404).json({ Err: `Ninguno de los productos tiene id: ${request.params.id}`}) 
    
})

prodsRoute.post("/", checkAdmin, async (request : Request, response : Response) => {

    const err = await requestInputCheck(request)

    err ? response.status(400).json({err}) : 
    
    response.send(`Se guardo tu producto: ${JSON.stringify(request.body)} con id ${await save(request.body)}`)
})

prodsRoute.put("/:id", checkAdmin, async (request : Request, response : Response) => {

    const ErrBody = await requestInputCheck(request)

    const ErrParam = await requestParamCheck(request)

    const dataById = await getById(request.params.id)

    ErrBody ? response.status(400).json({ErrBody}) : 
    
    ErrParam ? response.status(400).json({ErrParam}) : 
    
    dataById ? 
    
    response.send(`Se guardaron los siguientes cambios: ${JSON.stringify(request.body)} \n En tu producto con ID ${await update(request.body, dataById)}`) :

    response.send(`Se creo tu producto: ${JSON.stringify(request.body)} con id ${await save(request.body)}`)
        
    }
)

prodsRoute.delete("/:id", checkAdmin, async (request : Request, response : Response) => {

    const ErrParam = await requestParamCheck(request)

    const dataToDelete = await deleteById(request.params.id)

    ErrParam ? response.status(400).json({ErrParam}) : 
    
    response.send(`Se elimino tu producto con ID ${dataToDelete} `)
})

export default prodsRoute