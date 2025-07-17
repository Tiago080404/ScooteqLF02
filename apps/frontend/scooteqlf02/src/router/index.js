import { createRouter, createWebHistory } from "vue-router";
import AdminConsole from "../components/AdminConsole.vue";
const routes = [
  {
    path: "/admin",
    name: "AdminConsole",
    component: AdminConsole,
  },
];

const router = createRouter({
  history: createWebHistory(),

  routes,
});

export default router;
