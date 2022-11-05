const fs = require("fs")
const path = require("path")

const getAllFile = async (file) => {
    const filePath = path.resolve(__dirname, `../../${file}.json`)
    try{
        return await fs.promises.readFile(filePath, "utf-8").then((output) => JSON.parse(output))
    }catch(err){
        if(err == 'SyntaxError: Unexpected end of JSON input'){
            await fs.promises.writeFile(filePath, "[]") 
            return undefined
        }else{
            return `Error en la lectura del archivo error: ${err}`
        }
    }
}

const saveFile = async (obj, file) => {
    const filePath = path.resolve(__dirname, `../../${file}.json`)
    try{

        return await fs.promises.readFile(filePath, "utf-8").then((jsonInfo) => JSON.parse(jsonInfo))
        
            .then(async (jsonInfo) => {

                if(file == "chat"){

                    jsonInfo.push(obj)

                }else{

                    if(jsonInfo.length === 0){
                        obj.id = 1
                    }else{
                        obj.id = jsonInfo[jsonInfo.length - 1].id + 1
                    }

                    jsonInfo.push(obj)
                }

                try{

                    return await fs.promises.writeFile(filePath, JSON.stringify(jsonInfo)).then(() => {
                        return obj   
                    })

                }catch(err){ `Algo salio mal al sobreescribir el archivo, error: ${err}`}        
            })

    }catch(err){ `Algo salio mal al guardar el archivo, error: ${err}`}
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
    getAllFile,
    saveFile,
    requestInputCheck,
    requestParamCheck
}