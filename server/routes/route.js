const express = require('express')
const route = express.Router()
const { index, viewOne, neww, update, destroy } = require('../controllers/controller')

route.get('/api/products', index)
route.get('/api/products/:id', viewOne)
route.post('/api/products', neww)
route.patch('/api/products/:id', update)
route.delete('/api/products/:id', destroy)

module.exports = route