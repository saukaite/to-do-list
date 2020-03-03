const router = require('express').Router()
const toDoController = require('../controllers/toDoController.js')
const userController = require('../controllers/userController.js')
const middleware = require('../middleware/middleware.js')

router.get('/', (request, response) => {
  response.json({
    data:{
      message: 'API is working',
    },
    timestamp: new Date().getTime()
  })
})

router.route('/toDoItem')
.post(middleware.authenticate, toDoController.createToDoItem)
.get(middleware.authenticate, toDoController.getAllItems)

router.route('/deleteItem/:id')
.delete(middleware.authenticate, toDoController.deleteItem)
//.put(middleware.authenticate, toDoController.toggleItem)
//.get(middleware.authenticate, toDoController.getItem)

router.route('/register')
.post(userController.register)

router.route('/login')
.post(userController.login)

router.route('/logout')
.get(middleware.authenticate, userController.logout)

module.exports = router;
