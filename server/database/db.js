const mysql = require('mysql')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'vettori',
  password: 'minhasenha@db',
  database: 'df1hr'
 })

 db.connect(function(err) {
   if(err) throw err
   console.log('Database is connected successfully!')
 })

module.exports = db
