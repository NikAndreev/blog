import { createRouter, createWebHistory } from 'vue-router'

import Admin from '@src/pages/admin/Аdmin.vue'
import AdminPosts from '@src/pages/admin/includes/Posts.vue'
import EditPost from '@src/pages/admin/includes/EditPost.vue'
import AddPost from '@src/pages/admin/includes/AddPost.vue'

import Public from '@src/pages/public/Public.vue'
import Posts from '@src/pages/public/includes/Posts.vue'
import Post from '@src/pages/public/includes/Post.vue'
import NotFound from '@src/pages/public/includes/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'public',
    component: Public,
    children: [
      {
        path: '',
        name: 'posts',
        component: Posts
      },
      {
        path: ':id',
        name: 'post',
        component: Post
      },
      { 
        path: '/:pathMatch(.*)*', 
        name: 'notFound', 
        component: NotFound
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    children: [
      {
        path: '',
        name: 'adminPosts',
        component: AdminPosts
      },
      {
        path: 'add',
        name: 'addPost',
        component: AddPost
      },
      {
        path: 'edit/:id',
        name: 'editPost',
        component: EditPost
      }
    ]
  }
] 

const router = createRouter({
  history: createWebHistory(),
  routes, 
})

router.afterEach(() => {
  document.body.scrollTop = document.documentElement.scrollTop = 0
})

export default router
