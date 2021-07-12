import { RouteConfig } from 'vue-router';

export default [

  {
    name: 'auth-signin-page',
    path: '/auth/signin',
    component: () => import('@/pages/auth/sign-in.vue'),
    meta: {
      unauthenticatedUserOnly: true
    }
  },

  {
    name: 'auth-signup-page',
    path: '/auth/signup',
    component: () => import('@/pages/auth/sign-up.vue'),
    meta: {
      unauthenticatedUserOnly: true
    }
  }

] as RouteConfig[];
