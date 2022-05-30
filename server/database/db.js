const Sequelize = require('sequelize')

const db = new Sequelize('df1hr', 'root', 'minhasenha@db', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = db
