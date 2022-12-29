const socketIo = require("socket.io")

let io

const innitWebSocket = (server) => {
    io = socketIo(server)
    io.on("connection", async (socket) => {
        console.log("CONEXION");

        // socket.on("postProduct", async (prod) => {
        //     io.emit("addToProdList", await 
        //     // productsDb.save(prod) ACA VA LA CALL A MONGO
        //     )
        // })

        // socket.on("postMsgToChat", async (msg) => {
        //     io.emit("addToChatList", await 
        //     // messagesDb.save(msg)ACA VA LA CALL A MONGO
        //     )
        // })
    })
}

module.exports = innitWebSocket 