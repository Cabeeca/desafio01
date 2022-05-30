//const db = require('../database/db')
const Product = require('../../models/Products.js')


const index = async (req, res) => {
  const products = await Product.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  })
  res.json(products)
}

const show = async (req, res) => {
  const products = await Product.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: { id: req.params.id }
  })
  res.json(products)
}

const create = async (req, res) => {
  const product = await Product.create(req.body)
  res.json(product)
}

const update = async (req, res) => {
  const product = await Product.update(req.body, { where: { id: req.params.id } })
  res.json(product)
}

const destroy = async (req, res) => {
  const product = await Product.destroy({ where: { id: req.params.id } })
  res.json(product) 
}


//export { index, show, create, update, destroy }
module.exports = { index, show, create, update, destroy }
