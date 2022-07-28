const knex = require('../connection/database')

module.exports = async (req, res) => {
	const { id: userId } = req.user
	const { id: projectId } = req.params

	// TODO
}
