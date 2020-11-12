const Post = require("../../models/Post");
const { AuthenticationError, UserInputError } = require("apollo-server");
const authCheck = require("../../utils/checkAuth");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = authCheck(context);
      if (body.trim() === "") {
        throw new UserInputError("empty comment", {
          errors: {
            body: "comment body must not be empty",
          },
        });
      }
      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else {
        throw new UserInputError("post not found");
      }
    },
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = authCheck(context);
      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);

        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("post not found");
      }
    },
  },
};
