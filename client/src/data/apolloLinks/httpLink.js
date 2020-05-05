import { from } from 'apollo-link'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { setContext } from 'apollo-link-context'

export default ({ httpEndPoint }) => {
	console.log(httpEndPoint)
	const httpLink = new BatchHttpLink({
		uri: httpEndPoint
	})

	return httpLink
}
