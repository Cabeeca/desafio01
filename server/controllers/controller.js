const db = require('../database/db')
const {
  signupValidation,
  loginValidation
} = require('../validations/validation')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const res = require('express/lib/response')

const index = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    return res.status(200).json(products)
  } catch (err) {
    return res.status(400).send({ error: err })
  }
}

const show = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { id: req.params.id }
    })
    return res.status(200).json(products)
  } catch (err) {
    return res.status(400).send({ error: err })
  }
}

const create = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    return res.status(201).json(product)
  } catch (err) {
    return res.status(400).send({ error: err })
  }
}

const update = async (req, res) => {
  try {
    const product = await Product.update(req.body, {
      where: { id: req.params.id }
    })
    return res.status(201).json(product)
  } catch (err) {
    return res.status(400).send({ error: err })
  }
}

const destroy = async (req, res) => {
  try {
    const product = await Product.destroy({
      where: { id: req.params.id }
    })
    return res.status(200).json(product)
  } catch (err) {
    return res.status(400).send({ error: err })
  }
}

const userIndex = (req, res) => {
  db.query(
    `SELECT * FROM users`
  , (err, results, fields) => {
    if (err) throw err
    return res.send({ message: 'Users list.', data: results })
  })
}

const userShow = async (req, res) => {
  db.query(
    `SELECT * FROM users WHERE id=(${db.escape(req.params.id)})`, (err, results, fields) => {
      if (err) throw err
      return res.send({ message: 'Requested user', data: results[0] })
    }
  )
}

const userCreate =
  (signupValidation,
  (req, res) => {
    db.query(
      `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
        req.body.email
      )})`,
      (err, result) => {
        if (result.length) {
          return res.status(409).send({
            msg: 'This user is alreay in use!'
          })
        } else {
          //Username is available
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({
                msg: err
              })
            } else {
              //Has hashed password => add to DB
              db.query(
                `INSERT INTO users (name, email, password) VALUES (${db.escape(
                  req.body.name
                )}, ${db.escape(req.body.email)}, ${db.escape(hash)})`,
                (err, result) => {
                  if (err) {
                    throw err
                    return res.status(400).send({
                      msg: err
                    })
                  }
                  return res.status(201).send({
                    msg: 'User registered successfully'
                  })
                }
              )
            }
          })
        }
      }
    )
  })

const userUpdate = (req, res) => {
  if (!req.params.id) {
    return res.send({ error: user, message: 'Please provide user ID.' })
  }
  db.query(`UPDATE users SET name = (${db.escape(req.body.name)}), email = (${db.escape(req.body.email)}) WHERE id = (${req.params.id})`, (err) => {
    if (err) throw err
    return res.send({ message: 'User has been successfully updated' })
  })
}

const userDestroy = (req, res) => {
  let user_id = req.params.id
  if (!user_id) {
    return res.send( {message: 'Please provide user ID.'})
  }
  db.query(`DELETE FROM users WHERE id = (${req.params.id})`, (err) => {
    if (err) throw err
    return res.send({ message: 'User has been successfully deleted' })
  })
}

const userLogin =
  (loginValidation,
  (req, res) => {
    db.query(
      `SELECT * FROM users WHERE email = ${db.escape(req.body.email)}`,
      (err, result) => {
        //User don't exists
        if (err) {
          throw err
          return res.status(400).send({
            msg: err
          })
        }
        if (!result.length) {
          return res.status(401).send({
            msg: 'Email or password is incorrect!'
          })
        }
        //Check password
        bcrypt.compare(
          req.body.password,
          result[0]['password'],
          (bErr, bResult) => {
            //wrong password
            if (bErr) {
              throw bErr
              return res.status(401).send({
                msg: 'Password is incorrect!'
              })
            }
            if (bResult) {
              const token = jwt.sign(
                { id: result[0].id },
                'the-super-strong-secret',
                { expiresIn: '1h' }
              )
              db.query(
                `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
              )
              return res.status(200).send({
                msg: 'Logged in!',
                token,
                user: result[0]
              })
            }
            return res.status(401).send({
              msg: 'Email or password is incorrect!'
            })
          }
        )
      }
    )
  })

const getUser =
  (signupValidation,
  async (req, res) => {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer') ||
      !req.headers.authorization.split(' ')[1]
    ) {
      return res.status(422).json({
        message: 'Please provide the token'
      })
    }
    const theToken = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(theToken, 'the-super-strong-secret')
    db.query(
      'SELECT * FROM users WHERE id=?',
      decoded.id,
      function (error, results, fields) {
        if (error) throw error
        return res.send({
          error: false,
          data: results[0],
          message: 'Fetch Successfully'
        })
      }
    )
  })

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  userIndex,
  userShow,
  userCreate,
  userLogin,
  userUpdate,
  userDestroy,
  getUser
}
