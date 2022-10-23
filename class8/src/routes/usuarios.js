const fs = require("fs/promises")
const path = require("path")
const { Router } = require("express")

const filePath = path.resolve(__dirname, "../..usuarios.json")

const usersRoute = Router()

usersRoute.get("/", async (request, response) => {
    response.send("funciona")
})

usersRoute.get("/:id", async (request, response) => {})

usersRoute.post("/:", async (request, response) => {})

usersRoute.put("/:id", async (request, response) => {})

usersRoute.delete("/:id", async (request, response) => {})

module.exports = usersRoute
