"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.args = void 0;
const minimist_1 = __importDefault(require("minimist"));
const optionalArgsObj = {
    alias: {
        p: "port",
        m: "mode"
    },
    default: {
        port: 8080,
        mode: "FORK"
    }
};
exports.args = (0, minimist_1.default)(process.argv.slice(2), optionalArgsObj);
