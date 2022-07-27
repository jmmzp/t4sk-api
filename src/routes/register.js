const express = require('express')
const register = require('../controllers/register')

const routes = express()

routes.post('/', register)

module.exports = routes
