const { posts } = require("../mock/post");
const { authCheck } = require("../helpers/auth");

// queries
const totalPosts = () => posts.length;
const allPosts = async (parent, args, { req }) => {
  await authCheck(req);
  return posts;
};

// mutations
const newPost = (parent, args, context) => {
  const { input } = args;
  const post = {
    id: posts.length++,
    title: input.title,
    description: input.description,
  };

  posts.push(post);
  return post;
};

module.exports = {
  Query: {
    totalPosts,
    allPosts,
  },
  Mutation: {
    newPost,
  },
};
