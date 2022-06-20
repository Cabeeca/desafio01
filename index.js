//Conexão Local
const createError = require('http-errors')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 8080
const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(require('./server/routes/route'))

//Lidar com erros
app.use((err, req, res) => {
  console.log(err)
  err.statusCode = err.statusCode || 500
  err.message = err.message || 'Internal Server Error'
  res.status(err.statusCode).json({
    message: err.message
  })
})

app.listen(PORT, () => {
  console.log(`Servidor iniciado em: http://localhost:${PORT}`)
})
