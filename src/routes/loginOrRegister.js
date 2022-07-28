const express = require('express')
const login = require('../controllers/loginOrRegister/login')
const register = require('../controllers/loginOrRegister/register')

const routes = express()

routes.post('/login', login)
routes.post('/register', register)

module.exports = routes
