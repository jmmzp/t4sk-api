module.exports = (nome, descricao, data_criacao, id_administrador) => {
	const body = {
		nome,
		id_administrador,
	}

	if (descricao) {
		body.descricao = descricao
	}

	if (data_criacao) {
		body.data_criacao = data_criacao
	}

	return body
}
