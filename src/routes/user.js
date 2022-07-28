const express = require('express')
const createProject = require('../controllers/createProject')
const getProjectById = require('../controllers/getProjectById')
const getProjects = require('../controllers/getProjects')

const routes = express()

routes.get('/verificar_token', (req, res) => {
	res.status(200).send()
})

routes.get('/projetos', getProjects)
routes.get('/projetos/:id', getProjectById)
routes.post('/projetos', createProject)

module.exports = routes
