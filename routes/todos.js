const express = require('express')
const router = express.Router()
const todosConstroller = require('../controllers/todos')

router
    .route('/todos')
    .get(todosConstroller.getTodos)
    .post(todosConstroller.createTodo)

router
    .route('/todos/:id')
    .patch(todosConstroller.updateTodo)
    .delete(todosConstroller.deleteTodo)

    module.exports = router