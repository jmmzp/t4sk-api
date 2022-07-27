const express = require('express')
const cors = require('cors')
const login = require('./src/routes/login')
const register = require('./src/routes/register')
const user = require('./src/routes/user')
const auth = require('./src/middlewares/auth')
const keyAcess = require('./src/middlewares/keyAcess')

require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

app.use(keyAcess)

app.use('/login', login)
app.use('/register', register)

app.use(auth)

app.use('/user', user)

app.listen(5000, () => {
	console.log('Server running...')
})
