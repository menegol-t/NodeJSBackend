import "dotenv/config"
import server from "./services/server"
import {innitMongo} from "./services/database"

const innit = async()=>{
    await innitMongo()
    const port = 8080
    server.listen(port, () => console.log(`Listening ${port}`))
}

innit()