const knex = require('../connection/database')

module.exports = async (userId, projectId) => {
	const [project] = await knex
		.select(
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
		.orWhere('projetos.id', projectId)

	if (!project) {
		return {
			code: 404,
			mensagem: 'Projeto não existe.'
		}
	}

	if (
		project.id_administrador !== userId &&
		project.permissao_usuario !== 'Visualizar, editar e excluir.'
	) {
		return {
			code: 401,
			mensagem: 'Você não tem permissão para excluir este projeto.'
		}
	}

	return {
		code: 200,
		mensagem: ''
	}
}
