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
const fakeController_1 = __importDefault(require("../controllers/fakeController"));
const auth_1 = require("../middlewares/auth");
const checkLogIn_1 = require("../middlewares/checkLogIn");
const productsTestRoute = (0, express_1.Router)();
productsTestRoute.get("/", checkLogIn_1.checkLogIn, auth_1.checkAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("prodIndex.pug", { prodData: yield (0, fakeController_1.default)() });
}));
exports.default = productsTestRoute;
