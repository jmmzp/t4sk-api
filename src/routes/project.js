const express = require('express')
const createProject = require('../controllers/project/createProject')
const deleteProject = require('../controllers/project/deleteProject')
const getProjectById = require('../controllers/project/getProjectById')
const getProjects = require('../controllers/project/getProjects')
const updateProject = require('../controllers/project/updateProject')

const routes = express()

routes.get('/', getProjects)
routes.get('/:id', getProjectById)
routes.post('/', createProject)
routes.put('/:id', updateProject)
routes.delete('/:id', deleteProject)

module.exports = routes
