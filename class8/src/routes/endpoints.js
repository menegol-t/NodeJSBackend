const {Router} = require("express")
const usersRoute = require("./usuarios")

const router = Router()

router.use("/usuarios", usersRoute)

module.exports = router
