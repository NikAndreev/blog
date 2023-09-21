import { createRouter, createWebHistory } from "vue-router";
import Admin from "./includes/Admin";
import Public from "./includes/Public";

const routes = [Admin, Public];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach(() => {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
});

export default router;
