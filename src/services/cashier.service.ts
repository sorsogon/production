import { Vue, Component } from "vue-property-decorator";

import { CashierModuleInterface } from "@/store/modules/cashier";

declare module "vue/types/vue" {
  interface Vue {
    $cashier: CashierModuleInterface,

    getAllPayments(): Promise<void>;
    storeDenomination(data: FormData): Promise<void>;
  }
}

@Component
export default class CashierServiceMixin extends Vue.mixin({}) {
  get $cashier(): CashierModuleInterface {
    return this.$store.state.cashier._state;
  }

  public async getAllPayments(): Promise<void> {
    try {
      const { data } = await this.$axios.get(`/api/app/cashier/payments`);
      this.$store.commit('cashier/updatePayments', data);
    } catch(error) {
      console.log(error);
    }
  }

  public async storeDenomination(data: FormData) {
    try {
      await this.$axios.post(`/api/app/cashier/denomination/store`, data);
    } catch(error) {
      console.log(error);
    }
  }

}
