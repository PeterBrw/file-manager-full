import gql from "graphql-tag";

export default gql`
    mutation($id: ID) {
        deleteFile(id: $id) {
            id
            name
            type
        }
    }
`;
