import express from 'express';
import { createServer as createHttpServer } from 'http';

import { ApolloServer } from 'apollo-server-express';

import { schema } from './schema';
import { getContext } from './context';

const gqlContext = getContext()

export function startExpress(env) {
	const { HTTP_PORT, GQL_ENDPOINT } = env;

	const serverState = {
		isShutdown: false,
		healthCheckTime: undefined
	};

	const apollo = new ApolloServer({
		schema,
		context: gqlContext,
		debug: true,
		formatError: error => {
			console.log(`[GQL ERROR] ${JSON.stringify(error)}`);

			return error;
		}
	});

    const app = express();
    
    apollo.applyMiddleware({
		onHealthCheck: () => {
			serverState.healthCheckTime = Date.now();
			return new Promise((resolve, reject) => {
				if (serverState.isShutdown) {
					reject();
				}
				resolve();
			});
		},
		cors: true,
		bodyParserConfig: true,
		app,
		path: GQL_ENDPOINT,
	});

	const httpServer = createHttpServer(app);

	httpServer.listen(HTTP_PORT,
		() => {
			console.log(`API Server is now running on :${HTTP_PORT}${GQL_ENDPOINT}`);
			console.log(`Try your health check at :${HTTP_PORT}/.well-known/apollo/server-health`);
		}
	);

	return httpServer;
};
