import { onError } from 'apollo-link-error'

export default () => {
	return onError(
		({ graphQLErrors, networkError, operation, forward, response }) => {
			if (graphQLErrors) {
				graphQLErrors.forEach(error => {
					// console.log(`[Error Link][GraphQL error][${operation.operationName}]: ${JSON.stringify(error)}`)
				})
			}

			if (networkError) {
				// console.log(`[Error Link][Network error][${operation.operationName}]: ${JSON.stringify(networkError)}`)
			}
		}
	)
}
