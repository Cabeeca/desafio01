const { Sequelize } = require('sequelize')

const db = new Sequelize('df1hr', 'vettori', 'minhasenha@db', {
  host: 'localhost',
  dialect: 'postgres'
})

try {
  db.authenticate()
  console.log('Connection OK')
} catch (error) {
  console.error('Connection ERROR')
}

module.exports = db
  
