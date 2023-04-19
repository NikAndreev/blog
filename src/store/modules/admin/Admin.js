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
    updatePost({}, post) {
      return axios({
        method: 'put',
        url: `/posts/${post.id}`,
        data: post
      })
    },
    createPost({}, post) {
      return axios({
        method: 'post',
        url: '/posts/',
        data: post
      })
    },
    deletePost({}, id) {
      return axios({
        method: 'delete',
        url: `/posts/${id}`
      })
		}
	}
}
