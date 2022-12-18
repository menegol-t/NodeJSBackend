import { Router } from "express";
import prodsRoute from "./products";
import cartsRoute from "./carts";

const router = Router()

router.use("/products", prodsRoute)
router.use("/carts", cartsRoute)

export default router