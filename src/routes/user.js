const express = require('express')

const routes = express()

routes.get('/verify', (req, res) => {
	res.status(200).send()
})

module.exports = routes
