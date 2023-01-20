const express = require("express")
const app  = express()
const cors = require('cors')
const userRouter = require('./routes/users')
const todosRouter = require('./routes/todos')
const corsOptions = require('./configuration/corsOptions')
const PORT = process.env.PORT || 3000


app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended : true }))

app.get('/', (req, res) => {
    res.send('You Home')
})

app.use(userRouter)
app.use(todosRouter)
app.listen(PORT)
