const knex = require('../connection/database')

module.exports = async (id_usuario, { id, id_projeto, permissao_usuario }) => {
	const { rowCount } = await knex('usuarios_permitidos').insert({
		id_projeto,
		id_usuario,
		permissao_usuario
	})

	if (!rowCount) {
		return {
			code: 400,
			mensagem: 'Não foi possível aceitar o convite no momento.'
		}
	}

	const inviteResolved = await knex('convites_pendentes')
		.where('id', id)
		.andWhere('id_usuario', id_usuario)
		.del()

	if (inviteResolved < 1) {
		return {
			code: 400,
			mensagem: 'Não foi possível aceitar o convite no momento.'
		}
	}

	return {
		code: 200,
		mensagem: 'Convite aceito com sucesso.'
	}
}
