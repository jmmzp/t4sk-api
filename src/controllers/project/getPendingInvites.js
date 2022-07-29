const knex = require('../../connection/database')

module.exports = async (req, res) => {
	const { id: userId } = req.user

	try {
		const invites = await knex('convites_pendentes').where('id_usuario', userId)

		if (!invites[0]) {
			return res
				.status(404)
				.json({ mensagem: 'Não existem convites pendentes.' })
		}

		return res.json(invites)
	} catch (error) {
		return res.status(500).json({ mensagem: error.message })
	}
}
