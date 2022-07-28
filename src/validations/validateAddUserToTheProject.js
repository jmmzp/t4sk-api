const { string } = require('yup')
const yup = require('./config')

const schema = yup.object().shape({
	email_usuario: string().email().required(),
	permissao_usuario: string().strict().required()
})

module.exports = schema
