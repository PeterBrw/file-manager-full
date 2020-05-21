import gql from "graphql-tag";

export default gql`
    mutation($id: ID, $idTo: ID, $lastId: ID) {
        dragFile(id: $id, idTo: $idTo, lastId: $lastId) {
            id
            name
            type
        }
    }
`;
