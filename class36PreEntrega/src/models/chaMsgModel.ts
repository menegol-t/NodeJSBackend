import mongoose from "mongoose";
import { IUser, userSchema } from "./userModel";

const chatMsgsCollection = "chatMessages"

export interface IMsgGoingToDB{
    author: IUser,
    text: string
}

const chatMsgSchema = new mongoose.Schema<IMsgGoingToDB>(
    {
        author: {type: userSchema, required: true},
        text: {type: String, required: true}
    },
    {timestamps: true, versionKey: false}
)

export const ChatMsgModel = mongoose.model<IMsgGoingToDB>(
    chatMsgsCollection, chatMsgSchema
)