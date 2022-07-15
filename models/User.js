const Sequelize = require('sequelize')
const db = require('../server/database/db')

const User = db.create({
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(40),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      isEmaeil: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = User
