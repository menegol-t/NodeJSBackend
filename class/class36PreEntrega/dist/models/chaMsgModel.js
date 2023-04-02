"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMsgModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = require("./userModel");
const chatMsgsCollection = "chatMessages";
const chatMsgSchema = new mongoose_1.default.Schema({
    author: { type: userModel_1.userSchema, required: true },
    text: { type: String, required: true }
}, { timestamps: true, versionKey: false });
exports.ChatMsgModel = mongoose_1.default.model(chatMsgsCollection, chatMsgSchema);
