import { Router } from "express";
import productsTestRoute from "./productsTest"
import signupRoute from "./signup";
import loginRoute from "./login"
import logoutRoute from "./logout"
import chatRoute from "./chat"


const router = Router()
router.use("/products-test", productsTestRoute)
router.use("/signup", signupRoute)
router.use("/login", loginRoute)
router.use("/logout", logoutRoute)
router.use("/chat", chatRoute)

export default router