<template>
  <v-card>
    <v-card-title class="">
      <v-row class="py-3">
        <v-col cols="7" class="pa-0 px-3 d-flex align-center">
          {{ tax_type.text }}
        </v-col>
        <v-col cols="5" class="pa-0 d-flex px-3">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            class="pa-0"
          ></v-text-field>

          <v-menu
            transition="scale-transition"
            origin="top right"
            offset-y
            open-on-click
            fixed
            bottom
            left
            rounded="lg"
            :nudge-left="5"
            :min-width="160"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="ml-3"
                color="success"
                x-large
                fab
                plain
                v-bind="attrs"
                v-on="on"
                :height="36"
                :width="36"
              >
                <v-icon>
                  mdi-plus-box
                </v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item-group color="primary">
                <v-list-item
                  link
                  dense
                  class="text-right"
                  @click="$emit('newTransaction')"
                >
                  <v-list-item-icon>
                    <v-icon>
                      mdi-receipt
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>New Transaction</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  link
                  dense
                  class="text-right"
                  @click="$emit('showRegisterModal')"
                >
                  <v-list-item-icon>
                    <v-icon>
                      mdi-account-circle-outline
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>New Tax Payer</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-card-title>
    <v-data-table
      :items-per-page="12"
      :headers="headers"
      :items="tax_payments"
      :search="search"
      :loading="status"
      :height="table_height"
      fixed-header
      loading-text="Loading... Please wait"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-row justify="center">
          <v-btn small elevation="1" @click="$emit('showInfoModal', item)">
            View
            <v-icon right dark>
              mdi-file-eye
            </v-icon>
          </v-btn>
        </v-row>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <v-chip
          v-if="item.status == 'pending'"
          color="secondary lighten-3"
          class="ma-0"
          small
        >
          <span class="font-weight-medium">Pending</span>
        </v-chip>
        <v-chip
          v-else-if="item.status == 'granted'"
          color="success"
          class="ma-0"
          small
        >
          <span class="font-weight-medium">Granted</span>
        </v-chip>
        <v-chip
          v-else-if="item.status == 'denied'"
          color="error"
          class="ma-0"
          small
        >
          <span class="font-weight-medium">Denied</span>
        </v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class TaxPayerStatusTable extends Vue {
  @Prop() public approvalUpdate!: _object;
  @Prop() public newTaxPayer!: boolean;
  @Prop() public tax_type!: _object;
  @Prop() public new_tax_payment!: _object;

  public status = false;
  public tax_data: _object[] = [];
  public allPayments = false;
  public headers = [
    {
      text: "#",
      value: "id",
    },
    {
      text: "Full Name",
      value: "name",
    },
    {
      text: "Contact No.",
      value: "mobile",
    },
    {
      text: "Payment Type",
      value: "type",
    },
    {
      text: "Status",
      value: "status",
    },
    {
      text: "Actions",
      value: "actions",
      sortable: false,
      align: "center",
    },
  ];
  public search = "";

  public payment_types = [
    {
      text: "Professional Tax",
      value: "professional-tax",
    },
    {
      text: "Annual Fixed Tax",
      value: "annual-fixed-tax",
    },
    {
      text: "Franchise Tax",
      value: "franchise-tax",
    },
    {
      text: "Amusement Tax",
      value: "amusement-tax",
    },
    {
      text: "Transfer Tax",
      value: "transfer-tax",
    },
    {
      text: "Printing & Publication Tax",
      value: "printing-publication-tax",
    },
    {
      text: "Property Tax",
      value: "property-tax",
    },
    {
      text: "Sand and Gravel",
      value: "sand-gravel-tax",
    },
    {
      text: "Gymnasium Rental",
      value: "gymnasium-rental",
    },
    {
      text: "Space Lot Rental",
      value: "space-lot-rental",
    },
    {
      text: "Heavy Equipment Rental",
      value: "heavy-equipment-rental",
    },
    {
      text: "Accountable Forms",
      value: "accountable-forms",
    },
  ];

  public types = [
    {
      text: "Professional Tax",
      value: "professional_taxes",
    },
    {
      text: "Annual Fixed Tax",
      value: "annual_fixed_taxes",
    },
    {
      text: "Franchise Tax",
      value: "franchise_taxes",
    },
    {
      text: "Amusement Tax",
      value: "amusement_taxes",
    },
    {
      text: "Transfer Tax",
      value: "transfer_taxes",
    },
    {
      text: "Printing & Publication Tax",
      value: "printing_publication_taxes",
    },
    {
      text: "Property Tax",
      value: "property_taxes",
    },
    {
      text: "Sand and Gravel",
      value: "sand_gravel_taxes",
    },
    {
      text: "Gymnasium Rental",
      value: "gymnasium_rentals",
    },
    {
      text: "Space Lot Rental",
      value: "space_lot_rentals",
    },
    {
      text: "Heavy Equipment Rental",
      value: "heavy_equipment_rentals",
    },
    {
      text: "Accountable Forms",
      value: "accountable_forms",
    },
    {
      text: "All Payments",
      value: "all_payment",
    },
  ].sort((a, b) => {
    let fa = a.text.toLowerCase(),
      fb = b.text.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });

  public showInfoModal(item: any) {
    this.$emit("showInfoModal", item);
  }

  public get table_height() {
    const w_height = window.innerHeight;
    const t_height = w_height - 275;
    return t_height;
  }

  private get report_types() {
    let report_types = this.types.concat([
      {
        text: "All Payments",
        value: "all_payment",
      },
    ]);
    report_types.sort((a, b) => {
      let fa = a.text.toLowerCase(),
        fb = b.text.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });

    return report_types;
  }

  private get tax_payments() {
    let payments: _object[] = [];
    if (this.tax_type.value == "all_payment") {
      for (let i = 0; i < this.tax_data.length; i++) {
        const u = this.tax_data[i];

        for (let k = 0; k < this.report_types.length; k++) {
          const t = this.report_types[k];
          // console.log(t);
          if (t.value != "all_payment") {
            for (let j = 0; j < u[t.value].length; j++) {
              const p = u[t.value][j];
              if (
                p.documents != null &&
                (p.status == "granted" || p.status == "pending")
              ) {
                let documents: _object[] = [];

                Object.keys(p.documents).forEach((key) =>
                  documents.push({
                    filename: key,
                    url: p.documents[key],
                  })
                );
                const type = this.payment_types.filter(
                  (t) => t.value == p.for || t.value == p._for
                )[0];
                // const payment_type = this.types.filter(t => t.text)
                const payment = {
                  id: p.id,
                  user_id: u.id,
                  name: u.name,
                  email: u.email,
                  mobile: `${u.mobile}`,
                  type: type.text,
                  category: t.value,
                  status: p.status,
                  documents: documents,
                  data: p.data,
                  created_at: Date.parse(p.created_at),
                };
                payments.push(payment);
              }
            }
          }
        }
      }
    } else {
      for (let i = 0; i < this.tax_data.length; i++) {
        const u = this.tax_data[i];

        for (let j = 0; j < u[this.tax_type.value].length; j++) {
          const p = u[this.tax_type.value][j];
          if (
            p.documents != null &&
            (p.status == "granted" || p.status == "pending")
          ) {
            let documents: _object[] = [];

            Object.keys(p.documents).forEach((key) =>
              documents.push({
                filename: key,
                url: p.documents[key],
              })
            );
            const payment = {
              id: p.id,
              user_id: u.id,
              name: u.name,
              email: u.email,
              mobile: `${u.mobile}`,
              type: this.tax_type.text,
              category: this.tax_type.value,
              status: p.status,
              documents: documents,
              data: p.data,
              created_at: Date.parse(p.created_at),
            };

            payments.push(payment);
          }
        }
      }
    }
    payments.sort((a, b) => {
      let fa = a.created_at,
        fb = b.created_at;

      if (fa > fb) {
        return -1;
      }
      if (fa < fb) {
        return 1;
      }
      return 0;
    });
    return payments;
  }

  private async getForApproval() {
    this.status = true;
    try {
      const { data } = await this.$axios.get("/api/app/collector/payment");
      this.tax_data = data.payments;
      this.status = false;
    } catch (error) {
      console.log(error);
    }
  }

  // @Watch("approvalUpdate")
  // onUpdate() {
  //   this.tax_payments = this.tax_payments.filter(
  //     (payment) => payment.id != this.approvalUpdate.id
  //   );
  // }

  @Watch("newTaxPayer")
  onNewTaxPayer() {
    if (this.newTaxPayer == true) {
      this.getForApproval();
    }
  }

  @Watch("new_tax_payment")
  onNewTaxPayment() {
    if (this.new_tax_payment != {}) {
      this.getForApproval();
    }
  }

  created() {
    this.getForApproval();
  }
}
</script>

<style lang="postcss" scoped></style>
