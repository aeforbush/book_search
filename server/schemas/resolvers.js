// serve the response for the query here
const { Book, User } = require("../models");
// built in error handling
const { AuthenticationError } = require("apollo-server-express");
// import signToken function
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("books");
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = await signToken(user);
      return { user, token };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      console.log("---> correctPassword :" + correctPassword);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      console.log("---> token :" + token);
      return { token, user };
    },
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookData } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in.");
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await Book.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: context.bookId } },
          { new: true }
        );
        return updatedUser;
      }
    },
  },
};

module.exports = resolvers;
