import { RouteConfig } from 'vue-router';

export default [

  {
    name: 'app-notification',
    path: '/app/notification',
    component: () => import('@/pages/app/notification.vue'),
    meta: {
      authenticatedUserOnly: true
    }
  },

  {
    name: 'app-mailbox',
    path: '/app/mailbox',
    component: () => import('@/pages/app/mailbox.vue'),
    meta: {
      authenticatedUserOnly: true
    }
  }

] as RouteConfig[];