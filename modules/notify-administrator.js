'use strict'

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: '',
		pass: ''
	}
})

exports.emailAdministrator = () => {

	const mailOptions = {
		from: '',
		to: '',
		subject: 'New post has been created on the Local News Application!',
		text: 'Please check the Local News Application and approve the new content someone created: http://localhost:8080/admin_dashboard'
	}

	transporter.sendMail(mailOptions)
}
