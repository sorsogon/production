<template>
  <v-container class="pa-0">
    <v-dialog
      v-if="transactionModal"
      v-model="transactionModal"
      persistent
      max-width="500px"
    >
      <v-card>
        <v-card-title>
          <v-row class="px-3 py-2 pt-3" align-content="center">
            <span class="headline">New Transaction</span>
          </v-row>
        </v-card-title>
        <v-card-text class="pb-0">
          <v-row class="px-3 py-2">
            <v-col class="px-0 pb-0 pt-2" cols="12">
              <v-combobox
                dense
                hide-selected
                outlined
                :items="payor_names"
                :error="errors.user ? true : false"
                prepend-inner-icon="mdi-account"
                v-model="tax_payer"
                label="Tax Payer"
                name="tax_payer"
                hide-details="auto"
                class="ma-0"
              ></v-combobox>
            </v-col>
            <v-col class="px-0 pb-0 pt-2" cols="12">
              <v-combobox
                dense
                hide-selected
                outlined
                :items="tax_forms"
                :error="errors.tax_type ? true : false"
                prepend-inner-icon="mdi-file-multiple"
                v-model="tax_type"
                label="Payment Type"
                name="payment_type"
                hide-details="auto"
                class="ma-0"
              ></v-combobox>
            </v-col>
            <v-col class="px-0 py-2" cols="12">
              <v-file-input
                v-model="files"
                dense
                label="Upload Documents"
                multiple
                placeholder="Select your files"
                accept="image/png, image/jpeg, application/pdf"
                prepend-inner-icon="mdi-folder-multiple"
                :error="errors.docs ? true : false"
                hide-details="auto"
                @change="selectDocuments"
                prepend-icon=""
                outlined
              >
                <template v-slot:selection="{ index, text }">
                  <v-chip v-if="index < 2" dark label small>
                    {{ text }}
                  </v-chip>

                  <span
                    v-else-if="index === 2"
                    class="text-overline grey--text text--darken-3 mx-2"
                  >
                    +{{ files.length - 2 }} File(s)
                  </span>
                </template>
              </v-file-input>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn
            color="error"
            text
            type="button"
            @click.prevent="$emit('closeTransactionModal')"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            text
            type="button"
            @click.prevent="saveTransaction"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class NewTransactionModal extends Vue {
  @Prop() public transactionModal!: boolean;

  public forms = [
    {
      name: "Professional Tax",
      type: "professional_taxes",
      for: "professional-tax",
    },
    {
      name: "Annual Fixed Tax",
      type: "annual_fixed_taxes",
      for: "annual-fixed-tax",
    },
    {
      name: "Franchise Tax",
      type: "franchise_taxes",
      for: "franchise-tax",
    },
    {
      name: "Amusement Tax",
      type: "amusement_taxes",
      for: "amusement-tax",
    },
    {
      name: "Transfer Tax",
      type: "transfer_taxes",
      for: "transfer-tax",
    },
    {
      name: "Printing & Publication Tax",
      type: "printing_publication_taxes",
      for: "printing-publication-tax",
    },
    {
      name: "Property Tax",
      type: "property_taxes",
      for: "property-tax",
    },
    {
      name: "Sand and Gravel",
      type: "sand_gravel_taxes",
      for: "sand-gravel-tax",
    },
    {
      name: "Gymnasium Rental",
      type: "gymnasium_rentals",
      for: "gymnasium-rental",
    },
    {
      name: "Space Lot Rental",
      type: "space_lot_rentals",
      for: "space-lot-rental",
    },
    {
      name: "Heavy Equipment Rental",
      for: "heavy-equipment-rental",
    },
    {
      name: "Accountable Forms",
      type: "accountable_forms",
      for: "misc",
    },
  ];

  public tax_payers: _object[] = [];
  public files: _object[] = [];
  public payor_documents: _object = {};
  public errors: _object = {};

  public tax_type: any = "";
  public tax_payer: any = "";

  private get tax_forms() {
    let tax_forms = [];
    tax_forms = this.forms.map((f) => f.name).sort();
    return tax_forms;
  }

  private async getTaxPayers() {
    try {
      const { data } = await this.$axios.get("/api/app/collector/users");
      this.tax_payers = data;
    } catch (error) {
      console.log(error);
    }
  }

  private get payor_names() {
    return this.tax_payers.map((u) => {
      return {
        text: u.name,
        value: u.id,
      };
    });
  }

  private getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  private selectDocuments() {
    if (this.files.length == 0) {
      this.errors.docs = true;
    } else {
      this.errors = {};
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        this.getBase64(file)
          .then((data) => {
            const result: any = data;
            this.payor_documents[file.name] = result.replace(
              /^data:.+;base64,/,
              ""
            );
          })
          .catch((error) => console.log(error));
      }
    }
  }

  private async saveTransaction() {
    const user = this.tax_payers.filter((u) => u.id == this.tax_payer.value)[0];
    const payment_type = this.forms.filter((f) => f.name == this.tax_type)[0];

    const transaction_data: _object = {
      documents: JSON.stringify(this.payor_documents),
      id: user.id,
    };

    const credentials = new FormData();

    for (const name of Object.keys(transaction_data))
      credentials.append(name, transaction_data[name]);

    try {
      const { data } = await this.$axios.post(
        `/api/app/collector/payment/create/${payment_type.for}`,
        credentials
      );
      let documents: _object[] = [];

      Object.keys(data.documents).forEach((key) =>
        documents.push({
          filename: key,
          url: data.documents[key],
        })
      );
      const new_transaction_data = {
        id: data.id,
        user_id: user.id,
        name: user.name,
        email: user.email,
        mobile: `${user.mobile}`,
        type: payment_type.name,
        category: payment_type.type,
        status: data.status,
        documents: documents,
        payment_mode: "pay_onsite",
      };
      console.log(new_transaction_data);
      this.$emit("closeTransactionModal");
      this.$emit("newTransaction", new_transaction_data);
    } catch (error) {
      console.log(error);
    }
  }

  private created() {
    this.getTaxPayers();
  }
}
</script>
