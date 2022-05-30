const User = db.define('Users', {
  name: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false},
  password: {
    type: Sequelize.STRING(30),
    allowNull: false
  }
})
