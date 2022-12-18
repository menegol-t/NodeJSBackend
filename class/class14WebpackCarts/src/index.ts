import Server from "./services/server"
import Config from "./config/config"

Server.listen(Config.port, ()=>{
    console.log(`listening ${Config.port}`);
})