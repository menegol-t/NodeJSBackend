import { Router } from "express";
import productsRoute from "./products"

const router = Router()
router.use("/products", productsRoute)

export default router