const postResolvers = require("./posts");

const userResolvers = require("./users");
const commentsResolvers = require("./comments");
const likesResolvers = require("./likes");

module.exports = {
  Query: {
    ...postResolvers.Query,
  },

  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentsResolvers.Mutation,
    ...likesResolvers.Mutation,
  },
};
