import gql from "graphql-tag";

export default gql`
    mutation($id: ID, $idTo: ID) {
        dragFile(id: $id, idTo: $idTo) {
            id
            name
            type
        }
    }
`;
