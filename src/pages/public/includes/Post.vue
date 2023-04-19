<template>
  <v-card
    max-width="800"
    class="ml-auto mr-auto mb-6"
    :loading="isPending"
    :text="post.content"
    :subtitle="postDate"
  >
    <template v-slot:title>
      <div class="text-h4 mb-2">
        {{ post.title }}
      </div>
    </template>
  </v-card>
  <v-card
    max-width="800"
    class="ml-auto mr-auto"
    :loading="isСommentsPending"
    :subtitle="commentsCount"
  >
    <template v-slot:title>
      <div class="text-h5 mb-2">
        Комментарии
      </div>
    </template>
    <template v-slot:text>
      <CommentForm 
        :post-id="post.id || NaN"
        :is-disabled="isPending"
        @comment-created="getСomments"
      />
      <div 
        v-if="formattedСomments.length"
        class="mt-2"
      >
        <Comment 
          v-for="comment in formattedСomments"
          :key="comment.id"
          :comment="comment"
          @comment-created="getСomments"
        />
      </div>
      <div 
        v-else
        class="text-h6 mt-4"
      >
        Комментариев пока нет
      </div>
    </template>
  </v-card>
</template>

<script>
import { ref, computed } from 'vue'
import store from "@src/store"
import { useRoute } from 'vue-router'
import Comment from '@src/components/public/Comment.vue'
import CommentForm from '@src/components/public/CommentForm.vue'

export default {
  components: {
    Comment,
    CommentForm
  },
  setup() {
    const isPending = ref(true)
    const isСommentsPending = ref(true)
    const post = ref({})
    const comments = ref([])
    const route = useRoute()

    const postDate = computed(() => {
      return post.value.createdAt ? new Date(post.value.createdAt).toLocaleString('ru', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      }) : ''
    })

    const commentsCount = computed(() => {
      return `${comments.value.length || 0} ${declOfNum(comments.value.length || 0, ['комментарий', 'комментария', 'комментариев'])}`
    })

    const declOfNum = (number, words) => {
      return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
    }

    const getPost = () => {
      isPending.value = true

      store.dispatch('public/getPost', route.params.id)
        .then(res => {
          post.value = res.data
        })
        .finally(() => {
          isPending.value = false
        })
    }

    const getСomments = () => {
      isСommentsPending.value = true

      store.dispatch('public/getСomments', route.params.id)
        .then(res => {
          comments.value = res.data
        })
        .finally(() => {
          isСommentsPending.value = false
        })
    }

    const parentComments = computed(() => {
      return comments.value.filter(comment => !comment.parent_id)
    })

    const childСomments = computed(() => {
      return comments.value.filter(comment => comment.parent_id)
    })

    const formattedСomments = computed(() => {
      const result = parentComments.value.slice().map(comment => {
        comment.comments = []
        return comment
      })

      formatСomments(result, childСomments.value.slice())

      return result
    })

    const formatСomments = (parentComments, childСomments) => {
      if (childСomments.length === 0) {
        return
      }

      for (let i = 0; i < childСomments.length; i++) {
        const parentComment = parentComments.find(parentComment => parentComment.id === childСomments[i].parent_id || parentComment.comments.find(comment => comment.id === childСomments[i].parent_id))

        if (parentComment) {
          parentComment.comments.push(childСomments[i])
          childСomments.splice(childСomments.findIndex(comment => comment.id === childСomments[i].id), 1)
          i--
        }
      }

      formatСomments(parentComments, childСomments)
    }

    getPost()
    getСomments()

    return {
      isPending,
      isСommentsPending,
      post,
      postDate,
      commentsCount,
      formattedСomments,
      getСomments
    }
  }
}
</script>
