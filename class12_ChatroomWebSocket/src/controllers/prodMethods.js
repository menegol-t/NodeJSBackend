const fs = require("fs")
const path = require("path")

const filePath = path.resolve(__dirname, "../../products.json")

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

module.exports = {
    getAll,
    getById,
    save,
    update,
    deleteById,
    requestInputCheck,
    requestParamCheck
}