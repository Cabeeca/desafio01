const express = require('express')
const route = express.Router()
const { index, show, create, update, destroy } = require('../controllers/controller')
const  myMiddleware = require('../middlewares/request')

route.use(myMiddleware)

route.get('/api/products', index)
route.get('/api/products/:id', show)
route.post('/api/products', create)
route.patch('/api/products/:id', update)
route.delete('/api/products/:id', destroy)


module.exports = route