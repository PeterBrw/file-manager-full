import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import ConfigsContext from './contexts/ConfigsContext'
import getClient from './data/apolloClient'
import { InMemoryCache } from 'apollo-cache-inmemory'
import File from './components/File'

const Root = appConfigs => {
	const { api } = appConfigs
	const client = getClient({
		cache: new InMemoryCache(),
		graphqlOptions: {
			...api
		}
	})
	return (
		<ConfigsContext.Provider value={appConfigs}>
			<ApolloProvider client={client}>
				<File/>
			</ApolloProvider>
		</ConfigsContext.Provider>
	)
}

export default Root
