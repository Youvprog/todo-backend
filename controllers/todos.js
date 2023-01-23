const getCurrUser = require('../middleware/getCurrUser')
const { getData, insertData, updateData, deleteData } = require('../models/queryFunctions')

module.exports = {
    getTodos: async (req, res) => {
        
        const email = await getCurrUser(req.headers.authorization)
        if(!email) return res.status(401).send({msg: 'User not found'})
        const sql = 'SELECT * FROM TODOS WHERE email = ? ORDER BY position DESC'
        const result = await getData(sql, email)
        if(!result[0]) return res.status(500).send('Something went wrong, try again')
        res.status(200).send(result[0])

    },
    createTodo: async (req, res) => {
        
        const position_gap = 16384
        const { id, title, due_date, description } = req.body
        if(title) {
            const email = await getCurrUser(req.headers.authorization)
            if(!email) return res.status(401).send({msg: 'User not found'})
            const sql_max_pos = 'SELECT MAX(position) FROM TODOS WHERE email = ? '
            const sql = 'INSERT INTO TODOS (id, title, due_date, description, email, position) VALUES (?, ?, ?, ?, ?, ?)'
            const max_position = await getData(sql_max_pos, email)
            const position = max_position[0][0]['MAX(position)'] + position_gap
            const todo  = await insertData(sql, id, title, due_date, description, email, position)
            if(!todo) return res.status(500).send('Something went wrong, try again')
            res.status(201).send({msg: 'TODO CREATED SUCCESSFULLY', todo})
        }

    },
    updateTodo: async (req, res) => {
      
        const sql = 'UPDATE todos SET ?  WHERE id= ?'
        console.log(req.body)
        const response = await updateData(sql, req.body, req.params.id)
        if(!response) return res.status(500).send({msg: 'Something went wrong'})
        res.status(200).send({msg: 'Todo updated successfully'})

    },
    deleteTodo: async (req, res) => {
   
        const sql = 'DELETE FROM todos WHERE id = ?'
        const response = await deleteData(sql, req.params.id)
        if(!response) return res.status(500).send({msg: 'Something went wrong'})
        res.status(202).send({msg: 'TODO DELETED SUCCESSFULLY'})
    }
}