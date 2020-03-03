const jwt = require("jsonwebtoken")
const {
  secretSalt
} = require('../config/config')
const User = require('../models/userModel')


let authenticate = (request, response, next) => {
  let token = request.header('x-auth')
  let decoded;
  try {
    decoded = jwt.verify(token, secretSalt)
    User.findOne({
      _id: decoded._id,
      "tokens.access": "auth",
      "tokens.token": token
    }).then((user) => {
      if (user) {
        request.user = user
        request.token = token
        next()
      } else {
        response.status(401).json("Not authorized")
      }
    })
  } catch(e) {
    response.status(400).json(e)
  }
}

module.exports = {
  authenticate
}
