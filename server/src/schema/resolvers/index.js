import merge from 'lodash/merge';

import { resolvers as Root } from './Root';
import { resolvers as File } from './File';

const resolversMap = merge(
	{},
	Root,
	File
);

export default resolversMap;
