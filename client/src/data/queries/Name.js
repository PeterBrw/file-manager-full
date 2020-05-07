import gql from "graphql-tag";

export default gql`
    query($id: ID!) {
        getName(id: $id) 
    }
`;
