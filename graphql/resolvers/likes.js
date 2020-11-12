const Post = require("../../models/Post");
const { UserInputError } = require("apollo-server");

const authCheck = require("../../utils/checkAuth");

module.exports = {
  Mutation: {
    likePost: async (_, { postId }, context) => {
      const { username } = authCheck(context);

      const post = await Post.findById(postId);

      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          post.likes.push({ username, createdAt: new Date().toISOString() });
        }

        await post.save();
        return post;
      } else {
        throw new UserInputError("post not found");
      }
    },
  },
};
