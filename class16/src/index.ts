import Server from "./services/server"
import DBServices from "./controllers/DBMethods"

const messagesDb = new DBServices("messages")
const productsDb = new DBServices("products")

productsDb.innit()
messagesDb.innit()

const port = 8080

Server.listen(port, ()=>{
    console.log(`listening ${port}`);
})