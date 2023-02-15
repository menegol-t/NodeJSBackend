import { Server, Socket } from "socket.io";
import { logger } from "../config/logger";
import {saveMsg, getAllMsgs} from "../controllers/chatMsgs"
import { IMsgGoingToDB } from "../models/chaMsgModel";
import { IUser } from "../models/userModel";

interface ServerToClientEvents {
    fetchMsgsFromDB: (msgs: any) => void;
    newMsgInDB: (msg: any) => void;
}

interface ClientToServerEvents {
    postMsgToDB: (msg: IMsgGoingToDB) => void;
    userLoggedToChat: (usr: IUser) => void
}

const io = new Server<{}, ServerToClientEvents,{}>

const initWebSocket = (server: any) => {

    io.attach(server);

    io.on("connection", async (socket: Socket<ClientToServerEvents, ServerToClientEvents,{}>) => {

        socket.on("userLoggedToChat", async (usr: IUser) => {

            logger.info("New WS connection");

            socket.emit("fetchMsgsFromDB", await getAllMsgs());
        
            socket.on("postMsgToDB", async (msg: any) => {
                    io.emit("newMsgInDB", await saveMsg(usr, msg));
            });
        })

        
    });
};

export default initWebSocket;