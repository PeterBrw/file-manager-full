import { RetryLink } from 'apollo-link-retry'
import { isQuery, isMutation } from './utils'

export default new RetryLink({
	attempts: {
		max: 10,
		retryIf: (error, operation) => {
			if (!error) {
				return false
			}

			if (isQuery(operation)) {
				return true
			}

			if (isMutation(operation)) {
				return false
			}
		}
	},
	delay: {
		initial: 300,
		max: 10000,
		jitter: false
	}
})