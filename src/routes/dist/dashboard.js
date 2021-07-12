"use strict";
exports.__esModule = true;
exports["default"] = [
    {
        name: "dashboard-root-page",
        path: "/dashboard",
        component: function () { return Promise.resolve().then(function () { return require("@/pages/dashboard/index.vue"); }); },
        meta: {
            authenticatedUserOnly: true,
            allowedRoles: [
                "admin/verifier",
                "collector",
                "cashier",
                "liquidator",
                "developer",
            ]
        }
    },
    // [start] Taxpayer
    {
        name: "dashboard-tax-payer-page",
        path: "/d/taxpayer",
        component: function () { return Promise.resolve().then(function () { return require("@/pages/tax_payer/index.vue"); }); },
        meta: {
            authenticatedUserOnly: true,
            allowedRoles: ["payer", "developer"]
        },
        children: [
            {
                name: "d-tp-profile-stats",
                path: "stats/:category?",
                component: function () { return Promise.resolve().then(function () { return require("@/pages/tax_payer/tabs/stats.vue"); }); },
                meta: {
                    authenticatedUserOnly: true,
                    allowedRoles: ["payer", "developer"]
                }
            },
        ]
    },
    {
        name: "dashboard-tax-payer-management",
        path: "/d/taxpayer/manage/:category?",
        component: function () { return Promise.resolve().then(function () { return require("@/pages/tax_payer/management.vue"); }); },
        meta: {
            authenticatedUserOnly: true,
            allowedRoles: ["payer", "developer"]
        }
    },
    {
        name: "dashboard-tax-payer-payment",
        path: "/d/taxpayer/payment/:category/:item",
        component: function () { return Promise.resolve().then(function () { return require("@/pages/tax_payer/payment.vue"); }); },
        meta: {
            authenticatedUserOnly: true,
            allowedRoles: ["payer", "developer"]
        },
        props: true
    },
    {
        name: "d-tax-payer-editor-page",
        path: "/d/profile/edit/:page?",
        component: function () { return Promise.resolve().then(function () { return require("@/pages/tax_payer/about-profile-editor.vue"); }); },
        meta: {
            authenticatedUserOnly: true,
            allowedRoles: [
                "payer",
                "developer",
                "admin/verifier",
                "collector",
                "liquidator",
                "cashier",
            ]
        }
    },
    // [end]
    // [start] Collection Officer
    {
        name: "dashboard-tax-collector-page",
        path: "/d/taxcollector",
        component: function () { return Promise.resolve().then(function () { return require("@/pages/dashboard/tax-collector.vue"); }); },
        meta: {
            authenticatedUserOnly: true,
            allowedRoles: ["admin/verifier", "collector", "developer"]
        },
        children: [
            {
                path: "validation",
                component: function () { return Promise.resolve().then(function () { return require("@/components/tax_collector/Validation.vue"); }); }
            },
            {
                path: "payments",
                component: function () { return Promise.resolve().then(function () { return require("@/components/tax_collector/Payments.vue"); }); }
            },
        ]
    },
    // [end]
    {
        name: "dashboard-tax-liquidator-page",
        path: "/d/taxliquidator",
        component: function () { return Promise.resolve().then(function () { return require("@/pages/dashboard/tax-liquidator.vue"); }); },
        meta: {
            authenticatedUserOnly: true,
            allowedRoles: ["admin/verifier", "liquidator", "developer"]
        },
        children: [
            {
                path: "reports",
                component: function () { return Promise.resolve().then(function () { return require("@/components/tax_collector/Report.vue"); }); }
            },
        ]
    },
    {
        name: "dashboard-cashier-page",
        path: "/d/cashier",
        component: function () { return Promise.resolve().then(function () { return require("@/pages/dashboard/cashier.vue"); }); },
        meta: {
            authenticatedUserOnly: true,
            allowedRoles: ["admin/verifier", "cashier", "developer"]
        },
        children: [
            {
                path: "reports",
                component: function () { return Promise.resolve().then(function () { return require("@/components/cashier/Report.vue"); }); }
            },
            {
                path: "collections",
                component: function () { return Promise.resolve().then(function () { return require("@/components/cashier/Collection.vue"); }); }
            },
            {
                path: "payments",
                component: function () { return Promise.resolve().then(function () { return require("@/components/cashier/Payments.vue"); }); }
            },
        ]
    },
];
