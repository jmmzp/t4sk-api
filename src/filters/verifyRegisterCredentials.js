const validateEmail = require('./validateEmail')

module.exports = verifyRegisterCredentials = (nome, email, senha) => {
	if (!nome) {
		return { mensagem: 'Nome não foi informado.', statusCode: 406 }
	}
	if (!email) {
		return { mensagem: 'Email não foi informado.', statusCode: 406 }
	}
	if (!senha) {
		return { mensagem: 'Senha não foi informada.', statusCode: 406 }
	}

	const emailIsValid = validateEmail(email)

	if (emailIsValid) {
		return {
			mensagem: emailIsValid,
			statusCode: 400,
		}
	}

	if (senha.length < 6) {
		return {
			mensagem: 'Sua senha precisa ser maior que 6 caracteres.',
			statusCode: 400,
		}
	}

	return {
		mensagem: 'Tudo certo.',
		statusCode: 200,
	}
}
