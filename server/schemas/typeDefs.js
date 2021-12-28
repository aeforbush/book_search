// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`

  type User {
    _id: ID
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }
  type Book {
    bookId: ID 
    authors: [String]
    description: String
    image: String
    link: String
    title: String
  }
  type Auth {
    token: ID
    user: User
  }
  input SavedBooks {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: SavedBooks): User
    removeBook(bookId: String!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;
