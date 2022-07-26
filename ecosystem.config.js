module.exports = {
  apps : [{
    name: "VIDKAR",
    script: "npm start",
    env: {
      NODE_ENV: "development",
      "ROOT_URL": "http://srv127119-206152.vps.etecsa.cu:3000",
      "PORT": 3000,
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
