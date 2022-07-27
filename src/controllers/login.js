const verifyLoginCredentials = require('../filters/verifyLoginCredentials')
const bcrypt = require('bcrypt')
const knex = require('../connection/database')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
	const { email, senha } = req.body

	const { mensagem, statusCode } = verifyLoginCredentials(email, senha)
	if (mensagem) {
		return res.status(statusCode).json({ mensagem })
	}

	try {
		const [user] = await knex('usuarios').where('email', email)

		if (!user)
			return res.status(401).json({ mensagem: 'Email ou senha incorreto.' })

		const confirmPassword = await bcrypt.compare(senha, user.senha)
		if (!confirmPassword) {
			return res.status(401).json({ mensagem: 'Email ou senha incorreto.' })
		}

		const { senha: _, ...dataUser } = user

		const token = jwt.sign({ id: dataUser.id }, process.env.JWT_SECRET, {
			expiresIn: 604800,
		})

		return res.json({ usuario: dataUser, token })
	} catch (error) {
		return res.status(500).json({ mensagem: error.message })
	}
}
