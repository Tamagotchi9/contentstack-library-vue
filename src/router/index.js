import { createRouter, createWebHistory } from "vue-router";
import BookList from "@/views/BookList.vue";

const routes = [
  {
    path: '/',
    name: 'BookList',
    component: BookList,
  },
  {
    path: '/book/:uid',
    name: 'Book',
    component: () => import('@/views/Book.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'BookList' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
