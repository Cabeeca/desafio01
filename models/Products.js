const Sequelize = require('sequelize')
const db = require('../server/database/db')

const Product = db.define('products', {
  name: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  }
})

module.exports = Product
