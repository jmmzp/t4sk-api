const knex = require('../../connection/database')

module.exports = async (req, res) => {
	const { id } = req.user

	try {
		const response = await knex('projetos').where('id_administrador', id)

		if (response.length === 0) {
			return res.status(404).json({ mensagem: 'Não possui projeto ativo.' })
		}

		return res.json(response)
	} catch (error) {
		return res.status(500).json({ mensagem: error.message })
	}
}
