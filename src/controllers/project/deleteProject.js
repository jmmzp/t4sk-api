const { json } = require('express')
const knex = require('../../connection/database')
const permissionDeleteProject = require('../../utils/permissionDeleteProject')

module.exports = async (req, res) => {
	const { id: userId } = req.user
	const { id: projectId } = req.params

	try {
		const { code, mensagem } = await permissionDeleteProject(userId, projectId)

		if (code >= 400) {
			return res.status(code).json({ mensagem })
		}

		await knex('usuarios_permitidos')
			.where('id_projeto', projectId)
			.del()
			.debug()
		await knex('projetos').where('id', projectId).del().debug()

		return res.status(200).json({ mensagem: 'Projeto excluido com sucesso.' })
	} catch (error) {
		return res.status(400).json({ mensagem: error.message })
	}
}
