const knex = require('../connection/database')

module.exports = async (id_usuario, { id }) => {
	const inviteResolved = await knex('convites_pendentes')
		.where('id', id)
		.andWhere('id_usuario', id_usuario)
		.del()

	if (inviteResolved < 1) {
		return {
			code: 400,
			mensagem: 'Não foi possível recusar o convite no momento.'
		}
	}

	return {
		code: 200,
		mensagem: 'Convite recusado com sucesso.'
	}
}
