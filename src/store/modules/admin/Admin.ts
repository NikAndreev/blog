import PostModel from "@src/models/PostModel";
import axios from "axios";

export default {
  namespaced: true,
  actions: {
    getPosts() {
      return axios({
        method: "get",
        url: "/posts",
      });
    },
    getPost({}, id: number) {
      return axios({
        method: "get",
        url: `/posts/${id}`,
      });
    },
    updatePost({}, post: PostModel) {
      return axios({
        method: "put",
        url: `/posts/${post.id}`,
        data: post,
      });
    },
    createPost({}, post: PostModel) {
      return axios({
        method: "post",
        url: "/posts/",
        data: post,
      });
    },
    deletePost({}, id: number) {
      return axios({
        method: "delete",
        url: `/posts/${id}`,
      });
    },
  },
};
