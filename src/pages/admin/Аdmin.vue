<template>
  <v-app-bar app color="primary" title="Админка">
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
  </v-app-bar>

  <v-navigation-drawer app v-model="drawer" location="right" temporary>
    <v-list>
      <v-list-item v-for="item in nav" :key="item.url" :value="item.url">
        <v-list-item-title>
          <router-link :to="item.url" class="text-primary">
            {{ item.title }}
          </router-link>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-main>
    <v-container>
      <router-view />
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref } from "vue";

export default defineComponent({
  setup() {
    const drawer = ref(false);
    const nav = [
      {
        title: "Посты",
        url: "/admin",
      },
      {
        title: "Добавить пост",
        url: "/admin/add",
      },
    ];

    return {
      drawer,
      nav,
    };
  },
});
</script>
