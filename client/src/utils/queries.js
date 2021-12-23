import gql from "@apollo/client";


export const LOGIN = gql`
    query login($email: String!, $password: String!) {
        login (email: $email, password: $password){
            token
            user {
                _id
            }
        }
    }
`;

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        image
        link
        title
        description
      }
    }
  }
`;