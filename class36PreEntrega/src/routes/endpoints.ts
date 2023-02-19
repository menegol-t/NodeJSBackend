import { Router } from "express";
import productsTestRoute from "./productsTest"
import signupRoute from "./signup";
import loginRoute from "./login"
import logoutRoute from "./logout"
import chatRoute from "./chat"
import infoRoute from "./info"
import randomsRoute from "./randoms"
import homeRoute from "./home";
import profileRoute from "./profile";

const router = Router()
router.use("/products-test", productsTestRoute)
router.use("/signup", signupRoute)
router.use("/login", loginRoute)
router.use("/logout", logoutRoute)
router.use("/chat", chatRoute)
router.use("/info", infoRoute)
router.use("/randoms", randomsRoute)
router.use("/home", homeRoute)
router.use("/profile", profileRoute)

export default router