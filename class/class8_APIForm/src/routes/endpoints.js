const {Router} = require("express")
const usersRoute = require("./products")

const router = Router()

router.use("/products", usersRoute)

module.exports = router