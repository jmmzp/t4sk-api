const express = require('express')
const createProject = require('../controllers/createProject')
const deleteProject = require('../controllers/deleteProject')
const getProjectById = require('../controllers/getProjectById')
const getProjects = require('../controllers/getProjects')
const updateProject = require('../controllers/updateProject')

const routes = express()

routes.get('/', getProjects)
routes.get('/:id', getProjectById)
routes.post('/', createProject)
routes.put('/:id', updateProject)
routes.delete('/:id', deleteProject)

module.exports = routes
