import { ApolloClient } from 'apollo-client'
import { from } from 'apollo-link'

import getHttpLink from './apolloLinks/httpLink'
import getErrorLink from './apolloLinks/errorLink'
import retryLink from './apolloLinks/retryLink'
import info from '../../package.json'

const { name: clientName, version: clientVersion } = info

const getClient = ({ graphqlOptions, cache }) => {
	console.log(graphqlOptions)
	const httpLink = getHttpLink(graphqlOptions)
	const errorLink = getErrorLink()

	return new ApolloClient({
		cache,
		link: from([retryLink, errorLink, httpLink]),
		name: clientName,
		version: clientVersion,
		connectToDevTools: true
	})
}
export default getClient
