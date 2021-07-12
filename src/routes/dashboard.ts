import { RouteConfig } from "vue-router";

export default [
  {
    name: "dashboard-root-page",
    path: "/dashboard",
    component: () => import("@/pages/dashboard/index.vue"),
    meta: {
      authenticatedUserOnly: true,
      allowedRoles: [
        "admin/verifier",
        "collector",
        "cashier",
        "liquidator",
        "developer"
      ],
    },
  },

  // [start] Taxpayer
  {
    name: "dashboard-tax-payer-page",
    path: "/d/taxpayer",
    component: () => import("@/pages/tax_payer/index.vue"),
    meta: {
      authenticatedUserOnly: true,
      allowedRoles: ["payer", "guest", "developer"],
    },
    children: [
      {
        name: "d-tp-profile-stats",
        path: "stats/:category?",
        component: () => import("@/pages/tax_payer/tabs/stats.vue"),
        meta: {
          authenticatedUserOnly: true,
          allowedRoles: ["payer", "guest", "developer"],
        },
      },
    ],
  },

  {
    name: "dashboard-tax-payer-management",
    path: "/d/taxpayer/manage/:category?",
    component: () => import("@/pages/tax_payer/management.vue"),
    meta: {
      authenticatedUserOnly: true,
      allowedRoles: ["payer", "developer"],
    },
  },

  {
    name: "dashboard-tax-payer-payment",
    path: "/d/taxpayer/payment/:category/:item",
    component: () => import("@/pages/tax_payer/payment.vue"),
    meta: {
      authenticatedUserOnly: true,
      allowedRoles: ["payer", "developer"],
    },
    props: true,
  },

  {
    name: "d-tax-payer-editor-page",
    path: "/d/profile/edit/:page?",
    component: () => import("@/pages/tax_payer/about-profile-editor.vue"),
    meta: {
      authenticatedUserOnly: true,
      allowedRoles: [
        "payer",
        "guest",
        "developer",
        "admin/verifier",
        "collector",
        "liquidator",
        "cashier",
      ],
    },
  },

  // [end]

  // [start] Collection Officer
  {
    name: "dashboard-tax-collector-page",
    path: "/d/taxcollector",
    component: () => import("@/pages/dashboard/tax-collector.vue"),
    meta: {
      authenticatedUserOnly: true,
      allowedRoles: ["admin/verifier", "collector", "developer"],
    },
    children: [
      {
        path: "validation",
        component: () => import("@/components/tax_collector/Validation.vue"),
      },
      {
        path: "payments",
        component: () => import("@/components/tax_collector/Payments.vue"),
      },
    ],
  },

  // [end]

  {
    name: "dashboard-tax-liquidator-page",
    path: "/d/taxliquidator",
    component: () => import("@/pages/dashboard/tax-liquidator.vue"),
    meta: {
      authenticatedUserOnly: true,
      allowedRoles: ["admin/verifier", "liquidator", "developer"],
    },
    children: [
      {
        path: "reports",
        component: () => import("@/components/tax_collector/Report.vue"),
      },
    ],
  },

  {
    name: "dashboard-cashier-page",
    path: "/d/cashier",
    component: () => import("@/pages/dashboard/cashier.vue"),
    meta: {
      authenticatedUserOnly: true,
      allowedRoles: ["admin/verifier", "cashier", "developer"],
    },
    children: [
      {
        path: "reports",
        component: () => import("@/components/cashier/Report.vue"),
      },
      {
        path: "collections",
        component: () => import("@/components/cashier/Collection.vue"),
      },
      {
        path: "payments",
        component: () => import("@/components/cashier/Payments.vue"),
      },
    ],
  },
] as RouteConfig[];
