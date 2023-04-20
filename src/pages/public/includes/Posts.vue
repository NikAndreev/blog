<template>
  <v-card
    max-width="800"
    class="ml-auto mr-auto"
    :loading="isPending"
  >
    <v-card-title>
      <div class="text-h4">
        Посты
      </div>
    </v-card-title>
    <v-card-text>
      <v-list 
        v-if="posts.length"
        lines="two"
      >
        <v-list-item
          v-for="post in posts"
          :key="post.id"
          :value="post.id"
        >
          <v-list-item-title>
            <router-link 
              :to="`/${post.id}`"
              class="text-primary d-block text-h6 mb-1"
            >
              {{ post.title }}
            </router-link>
          </v-list-item-title>
          <v-list-item-subtitle>
            <div class="mb-1">
              {{ new Date(post.createdAt).toLocaleString('ru', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
              }) }}
            </div>
            {{ `${post.content.substring(0, 100)}...` }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <div 
        v-else
        class="text-h5"
      >
        Постов пока нет
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { ref } from 'vue'
import store from "@src/store"

export default {
  setup() {
    const isPending = ref(true)
    const posts = ref([]) 

    store.dispatch('public/getPosts')
      .then(res => {
        posts.value = res.data
      })
      .finally(() => {
        isPending.value = false
      })

    return {
      isPending,
      posts
    }
  }
}
</script>
