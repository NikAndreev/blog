import Public from "@src/pages/public/Public.vue";
import Posts from "@src/pages/public/includes/Posts.vue";
import Post from "@src/pages/public/includes/Post.vue";
import NotFound from "@src/pages/public/includes/NotFound.vue";

export default {
  path: "/",
  name: "public",
  component: Public,
  children: [
    {
      path: "",
      name: "posts",
      component: Posts,
    },
    {
      path: ":id",
      name: "post",
      component: Post,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: NotFound,
    },
  ],
};
