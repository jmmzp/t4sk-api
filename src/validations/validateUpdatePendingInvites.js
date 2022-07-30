const { boolean } = require('yup')
const yup = require('./config')

const schema = yup.object().shape({
	convite_aceito: boolean().required()
})

module.exports = schema
