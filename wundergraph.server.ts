import { configureWunderGraphServer } from '@wundergraph/sdk/server';

export default configureWunderGraphServer(() => ({
	hooks: {
		queries: {
			BitcoinV1BlockCount: {
				preResolve: async ({ operations }) => {},
			},
		},
		mutations: {},
	},
}));
