import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import axios from '@/plugins/axios';

const $axios = axios.service;

export interface CashierModuleInterface {
  payments?: _object[],
}

@Module({ namespaced: true, name: 'cashier' })
export class CashierModule extends VuexModule {
  public _state: CashierModuleInterface = {
    payments: []
  };


  @Mutation
  updatePayments(data: _object[]) {
    this._state.payments = data;
  }


}