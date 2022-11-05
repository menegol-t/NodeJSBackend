const socketIo = require("socket.io")
const {
    getAll,
    save,
    requestInputCheck,
    requestParamCheck
} = require("../controllers/wsMethods")

let io

const innitWebSocket = (server) => {
    io = socketIo(server)
    io.on("connection", (socket) => {
        socket.on("postchat", (msg) => {
            console.log(msg);
            save(msg, "chat")
        })
        socket.on("postprod", (msg) => {
            save(msg, "products")
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