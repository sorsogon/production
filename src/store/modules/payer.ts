import { VuexModule, Module, Mutation } from 'vuex-module-decorators';

export interface PayerModuleInterface {
  recentPaymentData?: _object[];
  readyToPayStats?: _object[];
  readyToPay?: _object[];
  pendingPayments?: _object[];

  payerVehicles?: _object[];

  vehicleCategories?: _object[];
  
  heavyEquipmentCategories?: _object[];
  gymnasiumCategories?: _object[];
  spaceLotCategories?: _object[];

  payerSandGravelBusinesses?: _object[];
  sandGravelMarketValues?: _object[];

  payerPrintingPublishingBusiness?: _object[];
  payerFranchises?: _object[];
  payerAmusements?: _object[];
  payerProfessions?: _object[];

  accountableCategories?: _object[];

  taxOnPaymentProcess?: _object | null;
}

@Module({
  namespaced: true,
  name: 'payer'
})
export class PayerModule extends VuexModule {
  public _state: PayerModuleInterface = {
    recentPaymentData: [],
    readyToPay: [],
    readyToPayStats: [],
    pendingPayments: [],
    
    payerVehicles: [],
    vehicleCategories: [],

    heavyEquipmentCategories: [],
    gymnasiumCategories: [],
    spaceLotCategories: [],

    payerSandGravelBusinesses: [],
    sandGravelMarketValues: [],
    
    payerPrintingPublishingBusiness: [],
    payerFranchises: [],
    payerAmusements: [],
    payerProfessions: [],

    accountableCategories: [],

    taxOnPaymentProcess: null
  };

  @Mutation
  public updatePaymentProcess(data: _object) {
    this._state.taxOnPaymentProcess = data;
  }

  @Mutation
  public resetTaxOnPaymentProcess() {
    this._state.taxOnPaymentProcess = null;
  }

  @Mutation
  public updateRecentPaymentData(data: _object[]) {
    this._state.recentPaymentData = data;
  }

  @Mutation
  public updateReadyToPayStats(data: _object[]) {
    this._state.readyToPayStats = data;
  }

  @Mutation
  public updateReadyToPay(data: _object[]) {
    this._state.readyToPay = data;
  }

  @Mutation 
  updatePendingPayments(data: _object[]) {
    this._state.pendingPayments = data;
  }

  @Mutation 
  updatePayerVehicles(data: _object[]) {
    this._state.payerVehicles = data;
  }
  
  @Mutation
  updateHeavyEquipmentCategories(data: _object[]) {
    this._state.heavyEquipmentCategories = data;
  }

  @Mutation
  updateGymnasiumCategories(data: _object[]) {
    this._state.gymnasiumCategories = data;
  }

  @Mutation
  updateSpaceLotCategories(data: _object[]) {
    this._state.spaceLotCategories = data;
  }

  @Mutation 
  updateVehicleCategories(data: _object[]) {
    this._state.vehicleCategories = data;
  }

  @Mutation 
  updatePayerSandGravelBusinesses(data: _object[]) {
    this._state.payerSandGravelBusinesses = data;
  }

  @Mutation
  updateSandGravelMarketValues(data: _object[]) {
    this._state.sandGravelMarketValues = data;
  }

  @Mutation
  updatePayerFranchises(data: _object[]) {
    this._state.payerFranchises = data;
  }

  @Mutation
  updatePayerAmusements(data: _object[]) {
    this._state.payerAmusements = data;
  }

  @Mutation
  updatePayerProfessions(data: _object[]) {
    this._state.payerProfessions = data;
  }

  @Mutation
  updateAccountableFormCategory(data: _object[]) {
    this._state.accountableCategories = data;
  }

  @Mutation
  updatePayerPrintingPublishingBusiness(data: _object[]) {
    this._state.payerPrintingPublishingBusiness = data;
  }

}
