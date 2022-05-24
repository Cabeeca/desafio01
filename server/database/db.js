const Sequelize = require('sequelize')

const db = new Sequelize('desafio01h', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = db
