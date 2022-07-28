require('dotenv').config()
const cors = require('cors')
const express = require('express')
const auth = require('./src/middlewares/auth')
const keyAcess = require('./src/middlewares/keyAcess')
const loginOrRegister = require('./src/routes/loginOrRegister')
const user = require('./src/routes/user')
const task = require('./src/routes/task')
const project = require('./src/routes/project')

const app = express()

app.use(express.json())
app.use(cors())

app.use(keyAcess)

app.use('/', loginOrRegister)

app.use(auth)

app.use('/user', user)
app.use('/projeto', project)
app.use('/task', task)

app.listen(process.env.PORT, () => {
	console.log('Server running...')
})
