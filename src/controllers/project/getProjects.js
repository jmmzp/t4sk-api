const knex = require('../../connection/database')

module.exports = async (req, res) => {
	const { id } = req.user

	try {
		const projects = await knex('projetos').where('id_administrador', id)

		if (projects.length === 0) {
			return res.status(404).json({ mensagem: 'Não possui projeto ativo.' })
		}

		return res.json(projects)
	} catch (error) {
		return res.status(500).json({ mensagem: error.message })
	}
}
