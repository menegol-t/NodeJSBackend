import Server from "./services/server"

const port = 8080

Server.listen(port, ()=>{
    console.log(`listening ${port}`);
    
})