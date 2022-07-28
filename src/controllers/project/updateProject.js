const knex = require('../connection/database')
const validateUpdateProject = require('../validations/validateUpdateProject')

module.exports = async (req, res) => {
	const { nome, descricao, data_criacao } = req.body
	const { id: userId } = req.user
	const { id: projectId } = req.params

	if (!nome && !descricao && !data_criacao) {
		return res.status(400).json({
			mensagem: 'Você precisa inserir pelo menos um campo para atualizar.'
		})
	}
	try {
		await validateUpdateProject.validate(req.body)

		const response = await knex('projetos')
			.where('id', projectId)
			.andWhere('id_administrador', userId)
			.update({
				nome,
				descricao,
				data_criacao
			})

		if (response < 1) {
			return res.status(400).json({
				mensagem: 'Não foi possível atualizar o projeto no momento.'
			})
		}

		return res.status(201).json({ mensagem: 'Projeto atualizado com sucesso.' })
	} catch (error) {
		return res.status(400).json({ mensagem: error.message })
	}
}
