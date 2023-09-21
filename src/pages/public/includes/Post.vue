<template>
  <v-card max-width="800" class="ml-auto mr-auto mb-6" :loading="isPending">
    <v-card-title>
      <div class="text-h4">
        {{ post.title }}
      </div>
    </v-card-title>
    <v-card-subtitle>
      {{ postDate }}
    </v-card-subtitle>
    <v-card-text>
      {{ post.content }}
    </v-card-text>
  </v-card>

  <v-card max-width="800" class="ml-auto mr-auto" :loading="isСommentsPending">
    <v-card-title>
      <div class="text-h5">Комментарии</div>
    </v-card-title>
    <v-card-subtitle>
      {{ commentsCount }}
    </v-card-subtitle>
    <v-card-text>
      <CommentForm
        :post-id="post.id || NaN"
        :is-disabled="isPending"
        @comment-created="getСomments()" />
      <div v-if="formattedСomments.length" class="mt-2">
        <Comment
          v-for="comment in formattedСomments"
          :key="comment.id"
          :comment="comment"
          @comment-created="getСomments()" />
      </div>
      <div v-else class="text-h6 mt-4">Комментариев пока нет</div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref, computed } from "vue";
import store from "@src/store";
import { useRoute } from "vue-router";
import Comment from "@src/components/public/Comment.vue";
import CommentForm from "@src/components/public/CommentForm.vue";
import PostModel from "@src/models/PostModel";
import CommentModel from "@src/models/CommentModel";

export default defineComponent({
  components: {
    Comment,
    CommentForm,
  },
  setup() {
    const isPending = ref(true);
    const isСommentsPending = ref(true);
    const post = ref(<PostModel>{});
    const comments = ref(<CommentModel[]>[]);
    const route = useRoute();

    const postDate = computed(() => {
      return post.value.createdAt
        ? new Date(post.value.createdAt).toLocaleString("ru", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          })
        : "";
    });

    const commentsCount = computed(() => {
      return `${comments.value.length || 0} ${declOfNum(
        comments.value.length || 0,
        ["комментарий", "комментария", "комментариев"]
      )}`;
    });

    const declOfNum = (number: number, words: string[]) => {
      return words[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
      ];
    };

    const getPost = () => {
      isPending.value = true;

      store
        .dispatch("public/getPost", route.params.id)
        .then((res) => {
          post.value = res.data;
        })
        .finally(() => {
          isPending.value = false;
        });
    };

    const getСomments = () => {
      isСommentsPending.value = true;

      store
        .dispatch("public/getСomments", route.params.id)
        .then((res) => {
          comments.value = res.data;
        })
        .finally(() => {
          isСommentsPending.value = false;
        });
    };

    const formattedСomments = computed(() => {
      const parentComments = comments.value
        .slice()
        .filter((comment) => !comment.parent_id)
        .map((comment) => Object.assign(comment, { comments: [] }));

      const childСomments = comments.value
        .slice()
        .filter((comment) => comment.parent_id);

      while (childСomments.length) {
        let current = childСomments.shift() as CommentModel;

        let parent = parentComments.find(
          (comment) =>
            comment.id === current.parent_id ||
            comment.comments?.find(
              (subComment) => subComment.id === current.parent_id
            )
        );

        if (parent) {
          parent.comments.push(current);
        }
      }

      return parentComments;
    });

    getPost();
    getСomments();

    return {
      isPending,
      isСommentsPending,
      post,
      postDate,
      commentsCount,
      formattedСomments,
      getСomments,
    };
  },
});
</script>
