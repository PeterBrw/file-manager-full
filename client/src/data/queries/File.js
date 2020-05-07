import gql from "graphql-tag";

export default gql`
    query  {
        getFiles {
            id
            name
            type
        }
    }
`;
