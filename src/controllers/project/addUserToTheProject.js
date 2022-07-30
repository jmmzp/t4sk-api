const knex = require('../../connection/database')
const validateAddUserToTheProject = require('../../validations/validateAddUserToTheProject')

module.exports = async (req, res) => {
	const { email_usuario, permissao_usuario } = req.body
	const { id: userId } = req.user
	const { id: projectId } = req.params

	try {
		await validateAddUserToTheProject.validate(req.body)

		const [project] = await knex('projetos')
			.where('id', projectId)
			.andWhere('id_administrador', userId)

		if (!project) {
			return res.status(404).json({ mensagem: 'Projeto não encontrado.' })
		}
	} catch (error) {
		return res.status(500).json({ mensagem: error.message })
	}

	if (
		permissao_usuario !== 'Apenas visualizar.' &&
		permissao_usuario !== 'Visualizar e editar.' &&
		permissao_usuario !== 'Visualizar, editar e excluir.'
	) {
		return res.status(400).json({
			mensagem:
				'Permissão do usuario precisa ser igual a: "Apenas visualizar.", "Visualizar e editar." ou "Visualizar, editar e excluir.".'
		})
	}

	try {
		const [userToAdd] = await knex('usuarios').where('email', email_usuario)

		const [userIsAlready] = await knex('usuarios_permitidos')
			.where('id_projeto', projectId)
			.andWhere('id_usuario', userToAdd.id)

		if (userIsAlready) {
			return res
				.status(400)
				.json({ mensagem: 'Usuario já faz parte do projeto.' })
		}

		if (!userToAdd) {
			return res.status(404).json({ mensagem: 'Usuario não encontrado.' })
		}

		if (userToAdd.id === userId) {
			return res
				.status(400)
				.json({ mensagem: 'Você não pode convidar a si mesmo.' })
		}

		const [userAlreadyHasAnInvite] = await knex('convites_pendentes')
			.where('id_usuario', userToAdd.id)
			.andWhere('id_projeto', projectId)

		if (userAlreadyHasAnInvite) {
			return res.status(400).json({
				mensagem: 'Este usuário já foi convidado para este projeto.'
			})
		}

		const { rowCount } = await knex('convites_pendentes').insert({
			id_projeto: projectId,
			id_usuario: userToAdd.id,
			permissao_usuario
		})

		if (!rowCount) {
			return res.status(400).json({
				mensagem: 'Não foi possível fazer o convite neste momento.'
			})
		}

		return res.json({ mensagem: 'Usuario convidado com sucesso.' })
	} catch (error) {
		return res.status(500).json({ mensagem: error.message })
	}
}
