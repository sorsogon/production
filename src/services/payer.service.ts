import { Vue, Component } from "vue-property-decorator";

import { PayerModuleInterface } from "@/store/modules/payer";

declare module "vue/types/vue" {
  interface Vue {
    $payer: PayerModuleInterface;
    $payment: _object | null | undefined;

    /** Documents */
    uploadPayerIdentityDocument(doc: FormData): Promise<any>;
    uploadPayerDocuments(doc: FormData): Promise<any>;

    /** Taxes */
    addNewPayerVehicle(data: FormData): Promise<any>;
    getAllPayerVehicles(): Promise<void>;
    getAllVehicleCategory(): Promise<void>;

    addNewPrintingPublishingBusiness(data: FormData): Promise<any>;
    getAllPayerPrintingPublishingBusiness(): Promise<void>;

    addNewSandGravelBusiness(data: FormData): Promise<any>;
    getAllPayerSandGravelBusiness(): Promise<void>;

    getAllPayerProfessions(): Promise<void>;

    addNewFranchise(data: FormData): Promise<any>;
    getAllPayerFranchises(): Promise<void>;

    addNewAmusement(data: FormData): Promise<any>;
    getAllPayerAmusements(): Promise<void>;

    getAllSandGravelFairMarketValues(): Promise<void>;

    /** Rentals */
    getAllHeavyEquipmentCategory(): Promise<void>;
    getAllSpaceLotCategory(): Promise<void>;
    getAllGymnasiumCategory(): Promise<void>;

    /** Misc */
    getAllAccountableFormCategory(): Promise<void>;

    /** */
    getComputedTotal(taxes: _object[]): number;

    /** Payment */
    getRecentPaymentData(): Promise<void>;
    getPaymentHistory(): Promise<void>;
    getAllReadyToPay(): Promise<void>;
    getAllPendingPayments(): Promise<void>;
    getReadyToPaySumFromServer(): Promise<void>;

    getPaymentTransactionInfo(id: number): Promise<any>;

    onPayerMakeTransaction(method: string): Promise<any>;
  }
}

@Component
export default class TaxpayerServiceMixin extends Vue.mixin({}) {
  /**
   * The store this service is using.
   *
   * @
   */
  get $payer(): PayerModuleInterface {
    return this.$store.state.payer._state;
  }

  get $payment(): _object | null | undefined {
    return this.$payer.taxOnPaymentProcess;
  }

  /**
   * Uploads a document to the server (POST)
   *
   * @param doc
   */
  public async uploadPayerIdentityDocument(docs: FormData) {
    try {
      const { data: user } = await this.$axios.post(
        "/api/app/payer/upload/document",
        docs
      );

      this.$store.dispatch("user/update", user);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   *
   *
   * @param doc
   */
  public async uploadPayerDocuments(docs: FormData) {
    try {
      switch (this.$route.params.category) {
        case 'professional-tax':
        case 'annual-fixed-tax':
        case 'franchise-tax':
        case 'amusement-tax':
        case 'sand-gravel-tax':
        case 'printing-publication-tax':
        case 'property-tax':
        case 'transfer-tax':
          await this.$axios.post(
            `/api/app/payer/taxes/create/${this.$route.params.category}`,
            docs
          );
          break;
        case 'heavy-equipment-rental':
        case 'gymnasium-rental':
        case 'space-lot-rental':
          await this.$axios.post(
            `/api/app/payer/rentals/create/${this.$route.params.category}`,
            docs
          );
          break;
        default:
          await this.$axios.post(
            `/api/app/payer/misc/create/${this.$route.params.category}`,
            docs
          );
      }
      
      this.getAllPendingPayments();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Fetches the recent payment data made by the user (GET)
   *
   */
  public async getRecentPaymentData(): Promise<void> {
    try {
      const { data } = await this.$axios.get(
        `/api/app/payer/payment/recent/${this.$route.params.category}`
      );
      this.$store.commit("payer/updateRecentPaymentData", data);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *
   */
  public async getPaymentHistory(): Promise<void> {
    try {
      const { data } = await this.$axios.get(
        `/api/app/payer/payment/recent/${this.$route.params.category}?all=true`
      );
      this.$store.commit("payer/updateRecentPaymentData", data);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *
   * @returns Promise<_object[]>
   */
  public async getReadyToPaySumFromServer(): Promise<void> {
    try {
      switch (this.$route.params.category) {
        case undefined:
        case "professional-tax":
        case "annual-fixed-tax":
        case "franchise-tax":
        case "amusement-tax":
        case "sand-gravel-tax":
        case "printing-publication-tax":
        case "property-tax":
        case "transfer-tax":
          {
            const { data } = await this.$axios.get(
              `/api/app/payer/taxes/summary/unpaid`
            );
            this.$store.commit("payer/updateReadyToPayStats", data);
          }
          break;
        case "heavy-equipment-rental":
        case "gymnasium-rental":
        case "space-lot-rental":
          {
            const { data } = await this.$axios.get(
              `/api/app/payer/rentals/summary/unpaid`
            );
            this.$store.commit("payer/updateReadyToPayStats", data);
          }
          break;
        default:
          {
            const { data } = await this.$axios.get(
              `/api/app/payer/misc/summary/unpaid`
            );
            this.$store.commit("payer/updateReadyToPayStats", data);
          }
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *
   * @returns Promise<_object[]>
   */
  public async getAllReadyToPay(): Promise<void> {
    try {
      switch (this.$route.params.category) {
        case "professional-tax":
        case "annual-fixed-tax":
        case "franchise-tax":
        case "amusement-tax":
        case "sand-gravel-tax":
        case "printing-publication-tax":
        case "property-tax":
        case "transfer-tax":
          {
            const { data } = await this.$axios.get(
              `/api/app/payer/taxes/payable/${this.$route.params.category}`
            );
            this.$store.commit("payer/updateReadyToPay", data);
          }
          break;
        case "heavy-equipment-rental":
        case "gymnasium-rental":
        case "space-lot-rental":
          {
            const { data } = await this.$axios.get(
              `/api/app/payer/rentals/payable/${this.$route.params.category}`
            );
            this.$store.commit("payer/updateReadyToPay", data);
          }
          break;
        default: {
          const { data } = await this.$axios.get(
            `/api/app/payer/misc/payable/${this.$route.params.category}`
          );
          this.$store.commit("payer/updateReadyToPay", data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *
   * @returns Promise<_object[]>
   */
  public async getAllPendingPayments(): Promise<void> {
    try {
      switch (this.$route.params.category) {
        case "professional-tax":
        case "annual-fixed-tax":
        case "franchise-tax":
        case "amusement-tax":
        case "sand-gravel-tax":
        case "property-tax":
        case "transfer-tax":
        case "printing-publication-tax":
          {
            const { data } = await this.$axios.get(
              `/api/app/payer/taxes/pending/${this.$route.params.category}`
            );
            this.$store.commit("payer/updatePendingPayments", data);
          }
          break;
        case "heavy-equipment-rental":
        case "gymnasium-rental":
        case "space-lot-rental":
          {
            const { data } = await this.$axios.get(
              `/api/app/payer/rentals/pending/${this.$route.params.category}`
            );
            this.$store.commit("payer/updatePendingPayments", data);
          }
          break;
        default: {
          const { data } = await this.$axios.get(
            `/api/app/payer/misc/pending/${this.$route.params.category}`
          );
          this.$store.commit("payer/updatePendingPayments", data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *
   * @param FormData
   *
   * @returns Promise<any>
   */
  public async addNewPrintingPublishingBusiness(fdata: FormData): Promise<any> {
    try {
      const { data } = await this.$axios.post(
        `/api/app/payer/taxes/category/printing-publication-tax`,
        fdata
      );
      this.$store.commit("payer/updatePayerPrintingPublishingBusiness", data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   *
   * @returns Promise<void>
   */
  public async getAllPayerPrintingPublishingBusiness(): Promise<void> {
    try {
      const { data } = await this.$axios.get(
        `/api/app/payer/taxes/category/printing-publication-tax`
      );
      this.$store.commit("payer/updatePayerPrintingPublishingBusiness", data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   *
   * @returns Promise<void>
   */
  public async addNewPayerVehicle(fdata: FormData): Promise<any> {
    try {
      const { data } = await this.$axios.post(
        `/api/app/payer/taxes/category/annual-fixed-tax`,
        fdata
      );

      this.$store.commit("payer/updatePayerVehicles", data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   *
   * @returns Promise<void>
   */
  public async getAllPayerVehicles() {
    try {
      const { data } = await this.$axios.get(
        `/api/app/payer/taxes/category/annual-fixed-tax/vehicle`
      );
      this.$store.commit("payer/updatePayerVehicles", data);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *
   * @returns Promise<void>
   */
  public async getAllVehicleCategory() {
    try {
      const { data } = await this.$axios.get(
        `/api/app/payer/taxes/category/annual-fixed-tax`
      );
      this.$store.commit("payer/updateVehicleCategories", data);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *
   * @returns Promise<any>
   */
  public async addNewSandGravelBusiness(fdata: FormData): Promise<any> {
    try {
      const { data } = await this.$axios.post(
        `/api/app/payer/taxes/category/sand-gravel-tax`,
        fdata
      );
      this.$store.commit("payer/updatePayerSandGravelBusinesses", data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   *
   * @returns Promise<void>
   */
  public async getAllPayerSandGravelBusiness(): Promise<void> {
    try {
      const { data } = await this.$axios.get(
        `/api/app/payer/taxes/category/sand-gravel-tax`
      );
      this.$store.commit("payer/updatePayerSandGravelBusinesses", data);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *
   * @returns Promise<any>
   */
  public async addNewAmusement(fdata: FormData): Promise<any> {
    try {
      const { data } = await this.$axios.post(
        `/api/app/payer/taxes/category/amusement-tax`,
        fdata
      );
      this.$store.commit("payer/updatePayerAmusements", data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   *
   * @returns Promise<void>
   */
  public async getAllPayerAmusements(): Promise<void> {
    try {
      const { data } = await this.$axios.get(
        `/api/app/payer/taxes/category/amusement-tax`
      );
      this.$store.commit("payer/updatePayerAmusements", data);
    } catch (error) {
      console.log(error);
    }
  }

  public async getAllSandGravelMarketValues(): Promise<void> {
    try {
      const { data } = await this.$axios.get(
        `/api/app/payer/taxes/category/sand-gravel-tax?market=true`
      );
      this.$store.commit("payer/updateSandGravelMarketValues", data);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *
   *
   * @returns Promise<void>
   */
  public async getAllHeavyEquipmentCategory(): Promise<void> {
    try {
      const { data } = await this.$axios.get(
        `/api/app/payer/rentals/category/heavy-equipment-rental`
      );
      this.$store.commit("payer/updateHeavyEquipmentCategories", data);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *
   *
   * @returns Promise<void>
   */
  public async getAllGymnasiumCategory(): Promise<void> {
    try {
      const { data } = await this.$axios.get(
        `/api/app/payer/rentals/category/gymnasium-rental`
      );
      this.$store.commit("payer/updateGymnasiumCategories", data);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *
   *
   * @returns Promise<void>
   */
  public async getAllSpaceLotCategory(): Promise<void> {
    try {
      const { data } = await this.$axios.get(
        `/api/app/payer/rentals/category/space-lot-rental`
      );
      this.$store.commit("payer/updateSpaceLotCategories", data);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *
   * @returns Promise<any>
   */
  public async addNewFranchise(fdata: FormData): Promise<any> {
    try {
      const { data } = await this.$axios.post(
        `/api/app/payer/taxes/category/franchise-tax`,
        fdata
      );
      this.$store.commit("payer/updatePayerFranchises", data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   *
   * @returns Promise<void>
   */
  public async getAllPayerFranchises(): Promise<void> {
    try {
      const { data } = await this.$axios.get(
        `/api/app/payer/taxes/category/franchise-tax`
      );
      this.$store.commit("payer/updatePayerFranchises", data);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *
   * @returns Promise<any>
   */
  public async onPayerMakeTransaction(method: string): Promise<any> {
    try {
      return await this.$axios.post(`/api/app/payer/payment/method/${ method }/${ this.$payment?.id }/${this.$route.params.category}`);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * 
   * @returns Promise<any>
   */
  public async onPayerTransactionSuccess(): Promise<void> {
    try {
      const { data } = await this.$axios.post(`/api/app/payer/payment/${ this.$payment?.id }/${ this.$route.params.category }`);
      this.$store.commit('payer/updatePaymentProcess', data);
    } catch(error) {
      return Promise.reject(error);
    }
  }

  /**
   *
   * @returns Promise<void>
   */
  public async getAllPayerProfessions(): Promise<void> {
    try {
      const { data } = await this.$axios.get(
        `/api/app/payer/taxes/category/professional-tax`
      );
      this.$store.commit("payer/updatePayerProfessions", data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   *
   * @returns Promise<void>
   */
  public async getAllAccountableFormCategory(): Promise<void> {
    try {
      const { data } = await this.$axios.get(
        `/api/app/payer/misc/category/accountable-forms`
      );
      this.$store.commit("payer/updateAccountableFormCategory", data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   *
   */

  /**
   * @param _object[]
   */
  public getComputedTotal(taxes: _object[]): number {
    let total = 0;

    taxes.forEach(
      (elem) => (total += elem.amount + elem.surcharge + elem.interest)
    );

    return total;
  }

  /**
   *
   * @param number
   */
  public async getPaymentTransactionInfo(id: number) {
    console.log(id);
    try {
      switch (this.$route.params.category) {
        case "professional-tax":
        case "annual-fixed-tax":
        case "amusement-tax":
        case "franchise-tax":
        case "sand-gravel-tax":
        case "printing-publication-tax":
        case "property-tax":
        case "transfer-tax":
          {
            const { data } = await this.$axios.get(
              `/api/app/payer/taxes/payable/${this.$route.params.category}/${id}`
            );
            this.$store.commit("payer/updatePaymentProcess", data);
          }
          break;
        case "heavy-equipment-rental":
        case "space-lot-rental":
        case "gymnasium-rental":
          {
            const { data } = await this.$axios.get(
              `/api/app/payer/rentals/payable/${this.$route.params.category}/${id}`
            );
            this.$store.commit("payer/updatePaymentProcess", data);
          }
          break;
        default:
          {
            const { data } = await this.$axios.get(
              `/api/app/payer/misc/payable/${this.$route.params.category}/${id}`
            );
            this.$store.commit("payer/updatePaymentProcess", data);
          }
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
