const socketIo = require("socket.io")
const DBServices = require("../controllers/DBMethods")

let io

new DBServices("products")

const innitWebSocket = (server) => {
    io = socketIo(server)
    io.on("connection", async (socket) => {

        socket.on("postProduct", async (msg) => {

            io.emit("addToProdList", await DBServices.save(msg, "products"))

        })

        socket.on("postMsgToChat", async (msg) => {

            io.emit("addToChatList", await DBServices.save(msg, "chat"))

        })
    })
}

export default innitWebSocket 