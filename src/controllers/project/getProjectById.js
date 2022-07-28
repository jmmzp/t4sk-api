const knex = require('../connection/database')

module.exports = async (req, res) => {
	const { id: userId } = req.user
	const { id: projectId } = req.params

	try {
		const [response] = await knex('projetos')
			.where('id', projectId)
			.andWhere('id_administrador', userId)

		if (!response) {
			return res.status(404).json({ mensagem: 'Projeto não encontrado.' })
		}

		return res.json(response)
	} catch (error) {
		return res.status(500).json({ mensagem: error.message })
	}
}
