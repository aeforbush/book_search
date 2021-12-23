// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  input SavedBooks {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedBooks: [Books]
  }
  type Books {
    _id: ID
    authors: [String]
    description: String
    bookId: ID 
    image: String
    link: String
    title: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: SavedBooks): User
    removeBook(bookId: ID!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;
