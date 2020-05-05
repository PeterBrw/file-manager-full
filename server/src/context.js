import { createExpressContext } from 'apollo-resolvers';

export const getContext = () =>
	({ res: response }) => {
		
		return createExpressContext({},
			response
		);
	};
