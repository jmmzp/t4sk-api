const knex = require('../../connection/database')
const acceptInvite = require('../../utils/acceptInvite')
const declineInvite = require('../../utils/declineInvite')
const validateUpdatePendingInvites = require('../../validations/validateUpdatePendingInvites')

module.exports = async (req, res) => {
	const { id: userId } = req.user
	const { id: inviteId } = req.params
	const { convite_aceito } = req.body

	try {
		await validateUpdatePendingInvites.validate(req.body)

		const [dataInvite] = await knex('convites_pendentes')
			.where('id', inviteId)
			.andWhere('id_usuario', userId)

		if (!dataInvite) {
			return res
				.status(400)
				.json({ mensagem: 'Não existe convites pendentes.' })
		}

		if (convite_aceito) {
			const { code, mensagem } = await acceptInvite(userId, dataInvite)

			return res.status(code).json({ mensagem })
		}

		const { code, mensagem } = await declineInvite(userId, dataInvite)

		return res.status(code).json({ mensagem })
	} catch (error) {
		return res.status(500).json({ mensagem: error.message })
	}
}
