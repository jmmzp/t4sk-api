const knex = require('../../connection/database')

module.exports = async (req, res) => {
	const { id: userId } = req.user

	try {
		const projects = await knex
			.select(
				'projetos.id',
				'projetos.nome',
				'projetos.descricao',
				'projetos.data_criacao',
				'projetos.id_administrador',
				'usuarios_permitidos.permissao_usuario'
			)
			.from('projetos')
			.leftJoin(
				'usuarios_permitidos',
				'projetos.id',
				'usuarios_permitidos.id_projeto'
			)
			.where('usuarios_permitidos.id_usuario', userId)
			.orWhere('projetos.id_administrador', userId)

		return res.json(projects)

		if (projects.length === 0) {
			return res.status(404).json({ mensagem: 'Não possui projeto ativo.' })
		}

		return res.json(projects)
	} catch (error) {
		return res.status(500).json({ mensagem: error.message })
	}
}
