const { posts } = require("../mock/post");

// queries
const totalPosts = () => posts.length;
const allPosts = () => posts;

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
