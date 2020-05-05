export const resolvers = {
	Query: {
		file: async (_, args, context) => {
			return {
				id: 1,
				name: 'My Computer'
			}
		}
	}
}