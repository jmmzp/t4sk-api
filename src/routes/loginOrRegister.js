const express = require('express')
const login = require('../controllers/login')
const register = require('../controllers/register')

const routes = express()

routes.post('/login', login)
routes.post('/register', register)

module.exports = routes
