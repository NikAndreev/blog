import Admin from "@src/pages/admin/Аdmin.vue";
import Posts from "@src/pages/admin/includes/Posts.vue";
import EditPost from "@src/pages/admin/includes/EditPost.vue";
import AddPost from "@src/pages/admin/includes/AddPost.vue";

export default {
  path: "/admin",
  name: "admin",
  component: Admin,
  children: [
    {
      path: "",
      name: "postsList",
      component: Posts,
    },
    {
      path: "add",
      name: "addPost",
      component: AddPost,
    },
    {
      path: "edit/:id",
      name: "editPost",
      component: EditPost,
    },
  ],
};
