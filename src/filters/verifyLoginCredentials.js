module.exports = verifyLoginCredentials = async (email, senha) => {
	if (!email) {
		return { mensagem: 'Email não foi informado.', statusCode: 406 }
	}
	if (!senha) {
		return { mensagem: 'Senha não foi informada.', statusCode: 406 }
	}

	return {
		mensagem: 'Tudo certo.',
		statusCode: 200,
	}
}
