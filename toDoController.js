const ToDoModel = require('../models/toDoModel')

let createToDoItem = (request, response) => {
  let data = request.body
  let todo = new ToDoModel()
  todo.title = data.title
  todo.creator = request.user._id
  todo.save()
    .then((item => {
      response.json(item)
    }))
    .catch(e => response.status(400).json(e))
}

let getAllItems = (request, response) => {
  ToDoModel.find({
      creator: request.user._id
    })
    .then((items) => {
      response.json(items)
    })
}

let deleteItem = (request, response) => {
  let id = request.param('id')
  ToDoModel.deleteOne({
      _id: id,
      creator: request.user._id
    })
    .then((resolved) => {
      response.json(resolved)
    })
    .catch(e => response.status(400).json(e))
}
/*
let toggleItem = (request, response) => {
  ToDoModel.findOne({
      _id: id,
      creator: request.user._id
    })
    .then((item) => {
      item.checked = !item.checked
      item.save()
        .then(saveItem = response.json(saveItem))
    })
    .catch(e => response.status(400).json(e))
}

let getItem = (request, response) => {
  ToDoModel.findOne({
      _id: id,
      creator: request.user._id
    })
    .then((item) => {
      response.json(item)
    })
    .catch(e => response.status(400).json(e))
}
*/
module.exports = {
  createToDoItem,
  getAllItems,
  deleteItem,
//  toggleItem,
//  getItem
}
