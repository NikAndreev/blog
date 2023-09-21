<template>
  <PostForm />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostForm from "@src/components/admin/PostForm.vue";

export default defineComponent({
  components: {
    PostForm,
  },
});
</script>
