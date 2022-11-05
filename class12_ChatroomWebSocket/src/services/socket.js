const socketIo = require("socket.io")
const {
    saveFile,
} = require("../controllers/wsMethods")

let io

const innitWebSocket = (server) => {
    io = socketIo(server)
    io.on("connection", async (socket) => {

        socket.on("postProd", async (msg) => {
            console.log(msg);

            io.emit("addToProdList", await saveFile(msg, "products") )

        })

        socket.on("postchat", async (msg) => {

            io.emit("addToChatList", await saveFile(msg, "chat"))

        })
    })
}

const getWebSocket = () => {
    return io
}

module.exports = {
    innitWebSocket,
    getWebSocket
}