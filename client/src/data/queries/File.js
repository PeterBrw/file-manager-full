import gql from 'graphql-tag'

export default gql`
	query File {
		file {
			id
			name
		}
	}
`
