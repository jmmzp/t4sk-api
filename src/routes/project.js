const express = require('express')
const addUserToTheProject = require('../controllers/project/addUserToTheProject')
const createProject = require('../controllers/project/createProject')
const deleteProject = require('../controllers/project/deleteProject')
const getPendingInvites = require('../controllers/project/getPendingInvites')
const getProjectById = require('../controllers/project/getProjectById')
const getProjects = require('../controllers/project/getProjects')
const updateProject = require('../controllers/project/updateProject')

const routes = express()

routes.get('/convites', getPendingInvites)
routes.get('/', getProjects)
routes.get('/:id', getProjectById)
routes.post('/', createProject)
routes.post('/:id/adicionar_usuario', addUserToTheProject)
routes.put('/:id', updateProject)
routes.delete('/:id', deleteProject)

module.exports = routes
