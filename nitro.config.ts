import { defineNitroConfig } from 'nitro/config';

// https://nitro.build/config
export default defineNitroConfig({
	compatibilityDate: '2026-02-15',
	serverDir: 'server',
	builder: 'rolldown',
	preset: 'cloudflare-module',
	routeRules: {
		'/**': {
			cors: true,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Headers': '*',
				'Access-Control-Expose-Headers': '*',
				'Access-Control-Allow-Credentials': 'true',
			},
		},
		'/photos/alice': { proxy: 'https://avatars.githubusercontent.com/u/81961962' },
		'/favicon.ico': {
			redirect: { to: 'https://library.gxres.net/images/icons/favicon.ico', status: 302 },
		},
		'/linklist/img/**': {
			proxy: 'https://raw.githubusercontent.com/s-complex/Friends/refs/heads/main/img/**',
			cache: { maxAge: 1209600 },
		},
	},
});
