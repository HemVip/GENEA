import * as Realm from 'realm-web';
import { responseError, responseJSON } from './utils';
import { handleUpload } from './submission/upload';
import { handleOptions } from './handleOptions';

let App;
const ObjectId = Realm.BSON.ObjectID;

export default {
	async fetch(request, env, ctx) {
		console.log('go here OPTIONS');
		if (request.method === 'OPTIONS') {
			// Handle CORS preflight requests
			return handleOptions(request);
		}

		if (request.method === 'GET') {
			return responseJSON({ message: 'It work' });
		}

		const url = new URL(request.url);
		App = App || new Realm.App(env.ATLAS_APPID);
		const method = request.method;
		const path = url.pathname.replace(/[/]$/, '');

		if (path !== '/api/submission') {
			return responseError(`Unknown '${path}' URL; try '/api/submission' instead.`, 404);
		}

		// const token = request.headers.get('authorization');
		const token = 'XnabV4Pa2RV6lgyJAj0uAun6X5KM6p0yJceHEm3EJ80757sasEjpP2smYNJaSkcv';
		if (!token) return responseError(`Missing 'authorization' header; try to add the header 'authorization: ATLAS_APP_API_KEY'.`);
		try {
			const credentials = Realm.Credentials.apiKey(token);
			// Attempt to authenticate
			var user = await App.logIn(credentials);
			var client = user.mongoClient('mongodb-atlas');
		} catch (err) {
			return responseError('Error with authentication.', 500);
		}

		try {
			// POST /api/submission
			if (path === '/api/submission' && method === 'POST') {
				console.log('Start upload');

				const { errors, success, msg } = await handleUpload(client, request, env);
				// console.log(errors, success, data, msg)
				return responseJSON({ errors, success, msg });
			}
			// unknown method
			return responseError('Method not allowed.', 405);
		} catch (err) {
			console.log(err);
			return responseError({
				errors: err,
				success: false,
				data: null,
				msg: 'Internal server error',
			});
		}
	},
};
