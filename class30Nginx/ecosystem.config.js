module.exports = {
  apps: [
    {
      script: "dist/main.js",
      watch: true,
      name: "mainJS",
      autorestart: true,
      instances: "max"
    }
  ]
}
