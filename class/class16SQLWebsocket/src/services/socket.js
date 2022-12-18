const socketIo = require("socket.io")
const DBServices = require("../controllers/DBMethods")

let io

const messagesDb = new DBServices("messages")
const productsDb = new DBServices("products")

const innitWebSocket = (server) => {
    io = socketIo(server)
    io.on("connection", async (socket) => {

        socket.on("postProduct", async (prod) => {
            io.emit("addToProdList", await productsDb.save(prod))
        })

        socket.on("postMsgToChat", async (msg) => {
            io.emit("addToChatList", await messagesDb.save(msg))
        })
    })
}

module.exports = innitWebSocket 