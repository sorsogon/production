import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import axios from "@/plugins/axios";

const $axios = axios.service;

@Module({ namespaced: true, name: "collector" })
export class CollectorModule extends VuexModule {
  public professional_category: _object[] = [];

  @Mutation
  public setProfessionalCategory(data: _object[]): void {
    this.professional_category = data;
  }

  @Action
  public async getProfessionalCategory() {
    try {
      const { data } = await $axios.get(
        "/api/app/collector/profession/categories"
      );

      this.context.commit(
        "setProfessionalCategory",
        data.profession_categories
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
