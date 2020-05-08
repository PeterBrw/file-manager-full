import gql from "graphql-tag";

export default gql`
    mutation($id: ID, $name: String) {
        addFile(id: $id, name: $name) {
            id
            name
            type
        }
    }
`;
