export default [
  {
    allowedRoles: [
      "admin/verifier",
      "collector",
      "liquidator",
      "cashier",
      "developer",
    ],
    icon: require("@/assets/images/png/iconpack/computer-772.png"),
    title: "PTMS Dashboard",
    to: "/dashboard",
  },
  {
    allowedRoles: ["payer", "developer"],
    icon: require("@/assets/images/png/iconpack/briefcase-1965.png"),
    title: "Taxpayer",
    sub: [
      {
        icon: "",
        title: "Accountable Forms",
        to: "/d/taxpayer/stats/accountable-forms",
      },

      // Provincial Charges
      {
        icon: "",
        title: "Provincial Rental Charges",
        sub: [
          {
            icon: require("@/assets/images/png/iconpack/house.png"),
            title: "Gymnasium Rental",
            to: "/d/taxpayer/stats/gymnasium-rental",
          },
          {
            icon: require("@/assets/images/png/iconpack/parking.png"),
            title: "Space & Lot Rental",
            to: "/d/taxpayer/stats/space-lot-rental",
          },
          {
            icon: require("@/assets/images/png/iconpack/demolishing.png"),
            title: "Heavy Equipment Rental",
            to: "/d/taxpayer/stats/heavy-equipment-rental",
          },
        ],
      },

      // Taxes
      {
        icon: "",
        title: "Taxes Category",
        sub: [
          {
            icon: require("@/assets/images/png/iconpack/engineer-2737.png"),
            title: "Professional Tax",
            to: "/d/taxpayer/stats/professional-tax",
          },
          {
            icon: require("@/assets/images/png/iconpack/delivery-truck-4437.png"),
            title: "Annual Fixed Tax",
            to: "/d/taxpayer/stats/annual-fixed-tax",
          },
          {
            icon: require("@/assets/images/png/iconpack/sand-bucket.png"),
            title: "Sand & Gravel Tax",
            to: "/d/taxpayer/stats/sand-gravel-tax",
          },
          {
            icon: require("@/assets/images/png/iconpack/store-773.png"),
            title: "Franchise Tax",
            to: "/d/taxpayer/stats/franchise-tax",
          },
          {
            icon: require("@/assets/images/png/iconpack/location-59.png"),
            title: "Amusement Tax",
            to: "/d/taxpayer/stats/amusement-tax",
          },
          {
            icon: require("@/assets/images/png/iconpack/file-transfer.png"),
            title: "Transfer Tax",
            to: "/d/taxpayer/stats/transfer-tax",
          },
          {
            icon: require("@/assets/images/png/iconpack/tuscany.png"),
            title: "Property Tax",
            to: "/d/taxpayer/stats/property-tax",
          },
          {
            icon: require("@/assets/images/png/iconpack/printer.png"),
            title: "Printing & Publication Tax",
            to: "/d/taxpayer/stats/printing-publication-tax",
          },
        ],
      },
    ],
  },

  {
    allowedRoles: ["admin/verifier", "collector", "developer"],
    icon: require("@/assets/images/png/iconpack/list-6238.png"),
    title: "Tax Collector",
    sub: [
      {
        icon: "",
        title: "Validation",
        to: "/d/taxcollector/validation",
      },
      {
        icon: "",
        title: "Payments",
        to: "/d/taxcollector/payments",
      },
      // {
      //   icon: '',
      //   title: 'Payments',
      //   to: '/d/taxcollector/payments'
      // },
    ],
  },
  {
    allowedRoles: ["admin/verifier", "liquidator", "developer"],
    icon: require("@/assets/images/png/iconpack/bank-6377.png"),
    title: "Tax Liquidator",
    to: "/d/taxliquidator/reports",
  },
  {
    allowedRoles: ["admin/verifier", "cashier", "developer"],
    icon: require("@/assets/images/png/iconpack/bank-check-6389.png"),
    title: "Cashiering",
    sub: [
      {
        icon: "",
        title: "Walk In Payments",
        to: "/d/cashier/payments",
      },
      {
        icon: "",
        title: "Payment Records",
        to: "/d/cashier/collections",
      },
      {
        icon: "",
        title: "Liquidating Officer's Reports",
        to: "/d/cashier/reports",
      },
      {
        icon: require("@/assets/images/png/iconpack/folder-1486.png"),
        title: "Accountable Forms",
        to: "/settings/calc/accountable-forms",
      },
    ],
  },
  {
    allowedRoles: ["admin/verifier", "developer"],
    icon: require("@/assets/images/png/iconpack/settings-8148.png"),
    title: "Settings",
    sub: [
      {
        icon: "",
        title: "Access Control",
        to: "/settings/acl",
      },
      {
        icon: "",
        title: "Formulation & Rules",
        to: "/settings/calc/professional-tax",
      },
      {
        icon: "",
        title: "Application Logs",
        to: "/settings/logs",
      },
    ],
  },
];
