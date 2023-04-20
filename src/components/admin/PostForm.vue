<template>
  <v-card
    max-width="800"
    class="ml-auto mr-auto"
    :loading="isPending"
  >
    <v-card-title class="mb-2">
      <div class="text-h4">
        {{ title }}
      </div>
    </v-card-title>
    <v-card-text>
      <v-form 
        :disabled="isPending"
        @submit.prevent="onSubmit"
        :novalidate="false"
      >
        <v-text-field
          v-model.trim="post.title"
          label="Заголовок"
          hide-details
          class="mb-4"
          required
        >
        </v-text-field>
        <v-textarea 
          v-model.trim="post.content"
          label="Контент"
          hide-details
          class="mb-4"
          required
        >
        </v-textarea>
        <v-btn
          color="primary"
          type="submit"
          :disabled="isPending"
        >
          Сохранить
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card> 
</template>

<script>
import { ref } from 'vue'
import store from "@src/store"
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const isPending = ref(true)
    const post = ref({})
    const title = ref('')
    const route = useRoute()
    const router = useRouter()

    const onSubmit = () => {
      isPending.value = true

      if (route.name === 'addPost') {
        post.value.createdAt = new Date()
      }

      store.dispatch(route.name === 'addPost' ? 'admin/createPost' : 'admin/updatePost', post.value)
        .then(() => {
          router.push({
            path: '/admin'
          })
        })
        .finally(()=> {
          isPending.value = false
        })
    }

    if (route.name === 'editPost' && route.params.id) {
      title.value = `Пост ${route.params.id}`

      store.dispatch('admin/getPost', route.params.id)
        .then(res => {
          post.value = res.data
        })
        .finally(() => {
          isPending.value = false
        })
    } else {
      title.value = 'Добавить пост'
      isPending.value = false
    }

    return {
      isPending,
      post,
      title,
      onSubmit
    }
  } 
}
</script>
