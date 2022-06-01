const express = require('express')
const route = express.Router()
const { index, show, create, update, destroy, userIndex, userShow, userCreate, userUpdate, userDestroy } = require('../controllers/controller')
const  myMiddleware = require('../middlewares/request')

route.use(myMiddleware)

route.get('/api/products', index)
route.get('/api/products/:id', show)
route.post('/api/products', create)
route.patch('/api/products/:id', update)
route.delete('/api/products/:id', destroy)

route.get('/api/users', userIndex)
route.get('/api/users/:id', userShow)
route.post('/api/users', userCreate)
route.patch('/api/users/:id', userUpdate)
route.delete('/api/users/:id', userDestroy)


module.exports = route