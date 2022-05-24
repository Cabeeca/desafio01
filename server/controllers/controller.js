//const db = require('../database/db')
const Product = require('../../models/Products.js')

const index = async (req, res) => {
  const products = await Product.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  })
  res.json(products)
}

const viewOne = async (req, res) => {
  const products = await Product.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: { id: req.params.id }
  })
  res.json(products)
}

const neww = async (req, res) => {
  await Product.create(req.body)
    .then(() => {
      return res.json({
        erro: false,
        msg: 'Produto cadastrado com sucesso!'
      })
    })
    .catch(() => {
      return res.status(400).json({
        erro: true,
        msg: 'ERRO! Produto não cadastrado com sucesso!'
      })
    })
}

const update = async (req, res) => {
  await Product.update(req.body, { where: { id: req.params.id } })
    .then(() => {
      return res.json({
        erro: false,
        msg: 'Ação realizada com sucesso!'
      })
    })
    .catch(() => {
      return res.status(400).json({
        erro: true,
        msg: 'ERRO! Algo de errado não deu certo!'
      })
    })
}

const destroy = async (req, res) => {
  await Product.destroy({ where: { id: req.params.id } })
    .then(() => {
      return res.json({
        erro: false,
        msg: 'Produto deletado com sucesso!'
      })
    })
    .catch(() => {
      return res.json({
        erro: true,
        msg: 'ERRO! Falha ao deletar produto!'
      })
    })
}

module.exports = { index, viewOne, neww, update, destroy }
