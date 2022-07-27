const express = require('express')
const login = require('../controllers/login')

const routes = express()

routes.post('/', login)

module.exports = routes
