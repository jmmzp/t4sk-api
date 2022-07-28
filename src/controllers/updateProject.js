const knex = require('../connection/database')
const verifyBodyProject = require('../filters/verifyBodyProject')
const bodyForSendProjects = require('../filters/bodyForSendProjects')

module.exports = async (req, res) => {
	const { nome, descricao, data_criacao } = req.body
	const { id } = req.user

	const { mensagem, statusCode } = 0

	if (statusCode >= 400) {
		return res.status(statusCode).json({ mensagem })
	}

	const body = bodyForSendProjects(nome, descricao, data_criacao, id)
	console.log(body)
	try {
		const { rowCount } = await knex('projetos').insert(body)

		if (!rowCount) {
			return res.status(400).json({
				mensagem: 'Não foi possível fazer o cadastro do projeto no momento.',
			})
		}

		return res.status(201).json({ mensagem: 'Projeto criado com sucesso.' })
	} catch (error) {
		return res.status(500).json({ mensagem: error.message })
	}
}
