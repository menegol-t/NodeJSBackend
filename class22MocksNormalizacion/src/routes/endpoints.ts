import { Router } from "express";
// import productsRoute from "./products"
import productsTestRoute from "./productsTest"

const router = Router()
// router.use("/products", productsRoute)
router.use("/products-test", productsTestRoute)

export default router