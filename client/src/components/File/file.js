import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import FileQuery from '../../data/queries/File'
const File = () => {
	const { data = { file: { id: '', name: '' } } } = useQuery(FileQuery)
	const { file: { id, name } } = data
	
	return (
		<>
			<div>
				ID: {id}
			</div>
			<div>
				NAME: {name}
			</div>
		</>
	)
}

export default File
