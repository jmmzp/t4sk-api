const express = require('express')
const handlePendingInvite = require('../controllers/user/handlePendingInvite')

const routes = express()

routes.get('/verificar_token', (req, res) => {
	res.status(200).send()
})

routes.put('/:id/convites', handlePendingInvite)

module.exports = routes
