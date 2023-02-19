"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsTest_1 = __importDefault(require("./productsTest"));
const signup_1 = __importDefault(require("./signup"));
const login_1 = __importDefault(require("./login"));
const logout_1 = __importDefault(require("./logout"));
const chat_1 = __importDefault(require("./chat"));
const info_1 = __importDefault(require("./info"));
const randoms_1 = __importDefault(require("./randoms"));
const home_1 = __importDefault(require("./home"));
const router = (0, express_1.Router)();
router.use("/products-test", productsTest_1.default);
router.use("/signup", signup_1.default);
router.use("/login", login_1.default);
router.use("/logout", logout_1.default);
router.use("/chat", chat_1.default);
router.use("/info", info_1.default);
router.use("/randoms", randoms_1.default);
router.use("/home", home_1.default);
exports.default = router;