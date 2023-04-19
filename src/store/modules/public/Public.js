import axios from 'axios'

export default {
  namespaced: true,
	actions: {
		getPosts() {
      return axios({
        method: 'get',
        url: '/posts'
      })
    },
    getPost({}, id) {
      return axios({
        method: 'get',
        url: `/posts/${id}`
      })
    },
    getСomments({}, postId) {
      return axios({
        method: 'get',
        url: '/comments',
        params: {
          post_id: postId
        }
      })
    },
    createСomment({}, comment) {
      return axios({
        method: 'post',
        url: '/comments',
        data: comment
      })
    }
	}
}
