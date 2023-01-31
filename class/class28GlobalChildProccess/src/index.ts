import "dotenv/config"
import server from "./services/server"
import {innitMongo} from "./services/database"
import { args } from "./config/arguments"

const innit = async()=>{
    await innitMongo()
    server.listen(args.port, () => console.log(`Listening ${args.port}`))
}

innit()

//to pass a port, "npm run dev -- -p 80"