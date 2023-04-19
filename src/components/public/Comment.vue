<template>
  <v-banner
    color="primary"
    density="compact"
  >
    <v-banner-text>
      <div class="text-h6" style="white-space: nowrap;">
        {{ comment.name }}
        <span 
          v-if="comment.parent_id"
          class="text-body-2"
        >
          в ответ на 
          <span 
            class="text-primary text-decoration-underline"
            style="cursor: pointer;"
          >
            коммент #{{ comment.parent_id }}
          </span>
        </span>
      </div>
      <div class="text-body-2">
        {{ comment.text }}
      </div>
      <template v-if="comment.comments?.length">
        <Comment
          v-for="comment in comment.comments"
          :key="comment.id"
          :comment="comment"
          @comment-created="onCommentCreated"
        >
        </Comment>
      </template>
      <CommentForm 
        v-show="isOpen"
        :post-id="comment.post_id"
        :parent-id="comment.id"
        @comment-created="onCommentCreated"
        class="mt-4"
      />
    </v-banner-text>
    <template v-slot:actions>
      <v-btn 
        @click="isOpen = !isOpen"
      >
        Ответить
      </v-btn>
    </template>
  </v-banner>
</template>

<script>
import { ref } from 'vue'
import CommentForm from '@src/components/public/CommentForm.vue'

export default {
  components: {
    CommentForm,
  },
  emits: ['commentCreated'],
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup(props, {emit}) {
    const isOpen = ref(false)

    const onCommentCreated = () => {
      emit('commentCreated')
      isOpen.value = false
    }

    return {
      isOpen,
      onCommentCreated
    }
  }
}
</script>
