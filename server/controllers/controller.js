const Product = require('../../models/Products')
const User = require('../../models/Users')

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
  const product = await Product.update(req.body, {
    where: { id: req.params.id }
  })
  res.json(product)
}

const destroy = async (req, res) => {
  const product = await Product.destroy({
    where: { id: req.params.id }
  })
  res.json(product)
}

const userIndex = async (req, res) => {
  const users = await User.findAll({
    attributes: {}
  })
  res.json(users)
}

const userShow = async (req, res) => {
  const users = await User.findAll({
    attributes: {},
    where: { id: req.params.id }
  })
  res.json(users)
}

const userCreate = async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
}

const userUpdate = async (req, res) => {
  const user = await User.update(req.body, {
    where: { id: req.params.id }
  })
  res.json(user)
}

const userDestroy = async (req, res) => {
  const user = await User.destroy({
    where: { id: req.params.id }
  })
}

//export { index, show, create, update, destroy }
module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  userIndex,
  userShow,
  userCreate,
  userUpdate,
  userDestroy
}
