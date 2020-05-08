import gql from "graphql-tag";

export default gql`
    mutation($id: ID, $newName: String) {
        changeName(id: $id, newName: $newName) {
            id
            name
            type
        }
    }
`;
