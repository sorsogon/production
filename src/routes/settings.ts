import { RouteConfig } from 'vue-router';

export default [

  {
    name: 'access-control',
    path: '/settings/acl',
    component: () => import('@/pages/admin/settings/acl.vue'),
    meta: {
      authenticatedUserOnly: true,
      allowedRoles: [ 'admin/verifier', 'developer' ]
    }
  },

  {
    name: 'application-logs',
    path: '/settings/logs',
    component: () => import('@/pages/admin/settings/logs.vue'),
    meta: {
      authenticatedUserOnly: true,
      allowedRoles: [ 'admin/verifier', 'developer' ]
    }
  },

  {
    name: 'computation',
    path: '/settings/calc/:category?',
    component: () => import('@/pages/admin/settings/calc.vue'),
    meta: {
      authenticatedUserOnly: true,
      allowedRoles: [ 'admin/verifier', 'developer', 'cashier:/settings/calc/accountable-forms', 'collector' ]
    }
  }


] as RouteConfig[];