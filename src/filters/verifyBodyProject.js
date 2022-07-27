module.exports = (nome, descricao) => {
	if (!nome) {
		return {
			mensagem: 'Você precisa digitar o nome do projeto.',
			statusCode: 400,
		}
	}

	if (nome.length > 40) {
		return {
			mensagem: 'O nome do projeto não pode ser maior que 40 caracteres.',
			statusCode: 400,
		}
	}

	if (descricao) {
		if (descricao.length > 250) {
			return {
				mensagem:
					'A descrição do projeto não pode ser maior que 250 caracteres.',
				statusCode: 400,
			}
		}
	}

	return {
		mensagem: 'Tudo certo.',
		statusCode: 200,
	}
}
