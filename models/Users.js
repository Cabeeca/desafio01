const Sequelize = require('sequelize')
const db = require('../server/database/db')

const User = db.define('users', {
  name: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING(30),
    allowNull: false
  }
})

User.sync()

module.exports = User