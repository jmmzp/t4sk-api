const { string, date } = require('yup')
const yup = require('./config')

const schema = yup.object().shape({
	nome: string().required().max(40),
	descricao: string().max(250),
	data_criacao: date()
})

module.exports = schema
