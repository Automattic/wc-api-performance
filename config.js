export const options = {
	stages: [
		{ duration: '2m', target: 5 },
		{ duration: '2m', target: 5 },
	],
	insecureSkipTLSVerify: true,
};

export const base_url = __ENV.HOST || 'https://w.test';

export const cs_key = __ENV.CS_KEY || 'xxxx';

export const cs_secret = __ENV.CS_SEC || 'xxxx';

export const custom_tag = __ENV.C_TAG || '';
