module.exports = async (req, res, next) => {
	const { api_key: key } = req.headers

	if (!key) {
		return res
			.status(401)
			.json(
				'Você precisa enviar a chave de acesso: "api_key" no header da requisição.'
			)
	}

	if (key !== process.env.VALID_API_KEY) {
		return res.status(401).json('Chave de acesso inválida.')
	}

	return next()
}
