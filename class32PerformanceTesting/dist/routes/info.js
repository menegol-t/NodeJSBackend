"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const arguments_1 = require("../config/arguments");
const os_1 = __importDefault(require("os"));
const infoRoute = (0, express_1.Router)();
infoRoute.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(arguments_1.args);
    console.log(process.platform);
    console.log(process.version);
    console.log(process.memoryUsage());
    console.log(process.execPath);
    console.log(process.pid);
    console.log(process.cwd());
    console.log(os_1.default.cpus().length);
    res.json({ OK: "ok" });
}));
exports.default = infoRoute;
