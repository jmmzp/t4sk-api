const express = require('express')

const routes = express()

routes.get('/verificar_token', (req, res) => {
	res.status(200).send()
})

module.exports = routes
