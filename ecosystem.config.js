module.exports = {
  apps : [{
    name: "Musaka Soft - Proyect",
    script: "npm start",
    env: {
      NODE_ENV: "development",
      "PORT": 3000,
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
