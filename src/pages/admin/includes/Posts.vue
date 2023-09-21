<template>
  <v-card max-width="800" class="ml-auto mr-auto" :loading="isPending">
    <v-card-title>
      <div class="text-h4">Посты</div>
    </v-card-title>
    <v-card-text>
      <v-table v-if="posts.length">
        <thead>
          <tr>
            <th>#</th>
            <th>ЗАГОЛОВОК</th>
            <th>ДАТА СОЗДАНИЯ</th>
            <th>ДЕЙСТВИЯ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id">
            <td>
              {{ post.id }}
            </td>
            <td>
              {{ post.title }}
            </td>
            <td>
              {{ new Date(post.createdAt).toLocaleString() }}
            </td>
            <td>
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn color="primary" v-bind="props" :disabled="isPending">
                    Действия
                  </v-btn>
                </template>
                <v-list density="compact">
                  <v-list-item value="edit">
                    <v-list-item-title>
                      <router-link
                        :to="`/admin/edit/${post.id}`"
                        class="text-primary">
                        Посмотреть
                      </router-link>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item value="delete">
                    <v-list-item-title
                      class="text-red text-decoration-underline"
                      style="cursor: pointer"
                      @click="onDelete(post.id)">
                      Удалить
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </td>
          </tr>
        </tbody>
      </v-table>
      <div v-else class="text-h5">
        Постов пока нет.
        <router-link to="/admin/add" class="text-primary">
          Создать пост
        </router-link>
        .
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref } from "vue";
import store from "@src/store";
import { AxiosResponse } from "axios";
import PostModel from "@src/models/PostModel";

export default defineComponent({
  setup() {
    const isPending = ref(true);
    const posts = ref(<PostModel[]>[]);

    const onDelete = (id: number) => {
      if (confirm("Вы уверены, что хотите удалить?")) {
        isPending.value = true;

        store
          .dispatch("admin/deletePost", id)
          .then(() => getPosts())
          .catch(() => (isPending.value = false));
      }
    };

    const getPosts = () => {
      store
        .dispatch("admin/getPosts")
        .then((res: AxiosResponse) => {
          posts.value = res.data;
        })
        .finally(() => {
          isPending.value = false;
        });
    };

    getPosts();

    return {
      isPending,
      posts,
      onDelete,
    };
  },
});
</script>
