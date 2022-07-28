const knex = require('../connection/database')
const validateCreateProject = require('../validations/validateCreateProject')

module.exports = async (req, res) => {
	const { nome, descricao, data_criacao } = req.body
	const { id } = req.user

	try {
		await validateCreateProject.validate(req.body)

		const { rowCount } = await knex('projetos').insert({
			nome,
			descricao,
			data_criacao,
			id_administrador: id
		})

		if (!rowCount) {
			return res.status(400).json({
				mensagem: 'Não foi possível fazer o cadastro do projeto no momento.'
			})
		}

		return res.status(201).json({ mensagem: 'Projeto criado com sucesso.' })
	} catch (error) {
		return res.status(400).json({ mensagem: error.message })
	}
}
