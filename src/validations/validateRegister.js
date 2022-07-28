const { string } = require('yup')
const yup = require('./config')

const schema = yup.object().shape({
	nome: string().required(),
	email: string().email().required(),
	senha: string().required().min(6)
})

module.exports = schema
