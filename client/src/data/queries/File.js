import gql from "graphql-tag";

export default gql`
    query($id: ID!) {
        getChildren(id: $id) {
            id
            name
            type
        }
    }
`;
