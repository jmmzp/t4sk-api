const bcrypt = require('bcrypt')
const knex = require('../connection/database')
const validateRegister = require('../validations/validateRegister')

module.exports = async (req, res) => {
	const { nome, email, senha } = req.body

	try {
		await validateRegister.validate(req.body)

		const [user] = await knex('usuarios').where('email', email)

		if (user)
			return res
				.status(401)
				.json({ mensagem: 'Email já registrado, tente usar outro.' })

		const passwordEncrypted = await bcrypt.hash(senha, 12)

		const { rowCount } = await knex('usuarios').insert({
			nome,
			email,
			senha: passwordEncrypted
		})

		if (!rowCount) {
			return res
				.status(400)
				.json({ mensagem: 'Não foi possível fazer o cadastro no momento.' })
		}

		return res.status(201).json({ mensagem: 'Cadastrado com sucesso.' })
	} catch (error) {
		return res.status(400).json(error.message)
	}
}
