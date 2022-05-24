//Conexão Local
const express = require('express')
const app = express()
const PORT = 8080

//Body-Parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('./server/routes/route'))

app.listen(PORT, () => {
  console.log(`Servidor iniciado em: http://localhost:${PORT}`)
})
