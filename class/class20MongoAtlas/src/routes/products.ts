import { Router } from "express";
import { requestBodyCheck, requestParamCheck, reqBodyUpdateCheck } from "../middleware/userInputChecks";
import {getAllProd, getProdById, saveProd, updateProd, deleteProd}  from "../controllers/prodMethods";
import { checkAdmin } from "../middleware/auth"

const prodsRoute = Router()

prodsRoute.get("/", getAllProd)

prodsRoute.get("/:productId", requestParamCheck, getProdById)

prodsRoute.post("/", checkAdmin, requestBodyCheck, saveProd)

prodsRoute.put("/:productId", checkAdmin, requestParamCheck, reqBodyUpdateCheck, updateProd)

prodsRoute.delete("/:productId", checkAdmin, requestParamCheck, deleteProd)

export default prodsRoute