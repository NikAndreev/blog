<template>
  <v-form
    :disabled="isPending || isDisabled"
    @submit.prevent="onSubmit"
    :novalidate="false">
    <v-text-field
      v-model="comment.name"
      label="Имя"
      hide-details
      class="mb-4"
      required>
    </v-text-field>
    <v-textarea
      v-model="comment.text"
      label="Комментарий..."
      hide-details
      class="mb-4"
      required>
    </v-textarea>
    <v-btn color="primary" type="submit" :disabled="isPending || isDisabled">
      Отправить
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref, toRefs } from "vue";
import store from "@src/store";
import CommentModel from "@src/models/CommentModel";

export default defineComponent({
  name: "CommentForm",
  emits: ["commentCreated"],
  props: {
    postId: {
      type: Number,
      required: true,
    },
    parentId: {
      type: Number,
      required: false,
      default: null,
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props, { emit }) {
    const comment = ref(<CommentModel>{});
    const isPending = ref(false);
    const { postId, parentId } = toRefs(props);

    const onSubmit = () => {
      isPending.value = true;

      store
        .dispatch(
          "public/createСomment",
          Object.assign(
            {
              post_id: postId.value,
              parent_id: parentId.value,
            },
            comment.value
          )
        )
        .then(() => {
          comment.value = {} as CommentModel;
          emit("commentCreated");
        })
        .finally(() => {
          isPending.value = false;
        });
    };

    return {
      comment,
      isPending,
      onSubmit,
    };
  },
});
</script>
