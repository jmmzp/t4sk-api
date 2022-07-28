const knex = require('../../connection/database')

module.exports = async (req, res) => {
	const { id: userId } = req.user
	const { id: projectId } = req.params

	try {
		const response = await knex('projetos')
			.where('id', projectId)
			.andWhere('id_administrador', userId)
			.del()

		if (response < 1) {
			return res.status(400).json({
				mensagem: 'Não foi possível excluir o projeto no momento.'
			})
		}

		return res.status(204).json({ mensagem: 'Projeto excluido com sucesso.' })
	} catch (error) {
		return res.status(400).json({ mensagem: error.message })
	}
}
