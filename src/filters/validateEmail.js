module.exports = validateEmail = email => {
	var regexValidEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i

	if (!regexValidEmail.test(email)) {
		return 'Email inserido é inválido.'
	}
	return
}
