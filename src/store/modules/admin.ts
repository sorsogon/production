import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import axios from '@/plugins/axios';

const $axios = axios.service;

export interface AdminModuleInterface {
  roles?: _object[],
  users?: _object[],

  rulesetTarget?: _object,
  penaltyTarget?: _object,

  accountables?: _object[],

  rulesets?: _object[],
  penalties?: _object[]
}

@Module({ namespaced: true, name: 'admin' })
export class AdminModule extends VuexModule {
  public _state: AdminModuleInterface = {
    roles: [
      { keyword: 'admin/verifier', name: 'Admin/Verifier' },
      { keyword: 'collector', name: 'Collector' },
      { keyword: 'liquidator', name: 'Liquidator' },
      { keyword: 'cashier', name: 'Cashier' },
      { keyword: 'developer', name: 'Developer' },
      { keyword: 'payer', name: 'Taxpayer' }
    ],
    users: [],

    rulesetTarget: {},
    penaltyTarget: {},

    accountables: [],

    rulesets: [],
    penalties: []
  };

  @Mutation
  updateUsers(data: _object[]) {
    this._state.users = data;
  }

  @Mutation
  updateRulesetTarget(data: _object) {
    this._state.rulesetTarget = data;
  }

  @Mutation
  updatePenaltyTarget(data: _object) {
    this._state.penaltyTarget = data;
  }

  @Mutation
  resetRulesetTarget() {
    this._state.rulesetTarget = {};
  }

  @Mutation
  resetPenaltyTarget() {
    this._state.penaltyTarget = {};
  }

  @Mutation
  updateAccountables(data: _object[]) {
    this._state.accountables = data;
  }

  @Mutation
  updateRulesets(data: _object[]) {
    this._state.rulesets = data;
  }

  @Mutation
  updatePenalties(data: _object[]) {
    this._state.penalties = data;
  }
}