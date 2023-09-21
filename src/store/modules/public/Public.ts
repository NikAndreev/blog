import CommentModel from "@src/models/CommentModel";
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
    getСomments({}, postId: number) {
      return axios({
        method: "get",
        url: "/comments",
        params: {
          post_id: postId,
        },
      });
    },
    createСomment({}, comment: CommentModel) {
      return axios({
        method: "post",
        url: "/comments",
        data: comment,
      });
    },
  },
};
