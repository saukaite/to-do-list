const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {
  secretSalt
} = require('../config/config')

let register = (request, response) => {
  let data = request.body
  let user = new User()
  user.email = data.email
  user.password = data.password
  user.save()
    .then((item) => {
      response.json(item)
    })
    .catch(e => response.status(400).json(e))
}

let login = (request, response) => {
  let data = request.body
  User.findOne({
      email: data.email
    })
    .then((user) => {
        if (!user) {
          response.json("No user with such email")
          return
        }
        bcrypt.compare(data.password, user.password, (error, resolved) => {
          if (resolved) {
            let access = 'auth'
            let token = jwt.sign({
              _id: user._id.toHexString(),
              access
            }, secretSalt).toString()
            user.tokens.push({
              access,
              token
            })
            user.save()
            .then((user1) => {
              response.header('x-auth', token).json(user1)
            })
          } else {
            response.json("Incorrect password")
          }
        })
      })
      .catch(e => response.status(400).json(e))
    }

let logout = (request, response) => {
  let user = request.user
  let token = request.token
  user.update({
    $pull: {
      tokens: {
        token
      }
    }
  }).then(() => {
    response.json("Logged out")
  }).catch(e => response.status(400).json(e))
}

module.exports = {
  register,
  login,
  logout
}
