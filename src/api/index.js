import { name, version } from '../../package.json';
import { Router } from 'express';
import mailer from './util/submailer';

export default ({ config, db }) => {
	let api = Router();

	api.get('/', (req, res) => {
		res.json({ name, version });
	});

	api.post('/subscribe', (req, res) => {
		var email = req.body.email;
		const result = mailer.sendConfirmationEmail(email);

		res.status(result.status);
		res.json({ result });
	});

	return api;
}
