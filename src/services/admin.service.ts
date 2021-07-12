import { Vue, Component } from 'vue-property-decorator';

import { AdminModuleInterface } from '@/store/modules/admin';

declare module 'vue/types/vue' {
  interface Vue {
    $admin: AdminModuleInterface;
    $ruleset: _object;
    $penalty: _object;

    /** Access Control Management */
    getAllRoles(): _object[];

    createNewUser(data: FormData): Promise<void>;

    updateUser(uid: number, data: FormData): Promise<void>;
    updateUserStatus(uid: number): Promise<void>;
    deleteUser(uid: number): Promise<void>;
    
    verifyUserAccount(uid: number): Promise<void>;

    getAllUsers(): Promise<void>;
    getAllCollectionOfficer(): Promise<void>;
    getAllAccountables(): Promise<void>;

    /** Ruleset Management */
    getAllRulesets(): Promise<void>;
    getAllPenalties(): Promise<void>;

    setRulesetToEdit(ruleset: _object): void;
    setPenaltyToEdit(penalty: _object): void;

    saveRuleset(): Promise<void>;
    updateRuleset(): Promise<void>;
    deleteRuleset(item: number): Promise<void>;
    verifyRuleset(): Promise<void>;

    savePenalty(): Promise<void>;
    updatePenalty(): Promise<void>;
    deletePenalty(item: number): Promise<void>;
    verifyPenalty(): Promise<void>;

    resetRuleset(): void;
    resetPenalty(): void;

    /** Application Logs */
  }
}


@Component
export default class AdminServiceMixin extends Vue.mixin({}) {
  get $admin(): AdminModuleInterface {
    return this.$store.state.admin._state;
  }
  
  get $ruleset(): _object {
    return this.$admin.rulesetTarget ?? {};
  }

  get $penalty(): _object {
    return this.$admin.penaltyTarget ?? {};
  }

  /** Access Control Management */
  public getAllRoles() { return this.$admin.roles ?? []; }

  public async createNewUser(fdata: FormData): Promise<void> {
    try {
      const { data } = await this.$axios.post(`/api/app/admin/user`, fdata);

      this.$store.state.admin._state.users.push(data);

      this.$store.commit('snackBar/toggle', {
        message: `Added ${ data.email } (${ data.role.name })`,
        color: 'success',
        toggle: true
      });
    } catch(error) {
      return Promise.reject(error);
    }
  }

  public async deleteUser(uid: number): Promise<void> {
    try {
      await this.$axios.delete(`/api/app/admin/user/${ uid }/delete`);
    } catch(error) {
      return Promise.reject(error);
    }
  }

  public async verifyUserAccount(uid: number): Promise<void> {
    try {
      await this.$axios.put(`/api/app/admin/user/${ uid }/verify`);
    } catch(error) {
      return Promise.reject(error);
    }
  }

  public async updateUser(uid: number, fdata: FormData): Promise<void> {
    try {
      await this.$axios.post(`/api/app/admin/user/${ uid }/update`, fdata);

      await this.getAllUsers();
    } catch(error) {
      return Promise.reject(error);
    }
  }

  public async updateUserStatus(uid: number): Promise<void> {
    try {
      await this.$axios.put(`/api/app/admin/user/${ uid }/status`);
    } catch(error) {
      return Promise.reject(error);
    }
  }

  public async getAllUsers() {
    try {
      const { data } = await this.$axios.get(`/api/app/admin/users`);
      this.$store.commit('admin/updateUsers', data);
    } catch(error) {
      return Promise.reject(error);
    }
  }

  public async getAllCollectionOfficer() {
    try {
      const { data } = await this.$axios.get(`/api/app/admin/user/collection-officer`);
      this.$store.commit('admin/updateUsers', data);
    } catch(error) {
      return Promise.reject(error);
    }
  }

  public async getAllAccountables() {
    try {
      const { data } = await this.$axios.get(`/api/app/cashier/accountables`);
      this.$store.commit('admin/updateAccountables', data);
    } catch(error) {
      return Promise.reject(error);
    }
  }

  /** Ruleset Management */
  public async getAllRulesets() {
    try {
      const { data } = await this.$axios.get(`/api/app/admin/rulesets/${ this.$route.params.category }`);
      this.$store.commit('admin/updateRulesets', data);
    } catch(error) {
      return Promise.reject(error);
    }
  }

  public setRulesetToEdit(ruleset: _object) {
    this.$store.commit('admin/updateRulesetTarget', ruleset);
  }

  public setPenaltyToEdit(penalty: _object) {
    this.$store.commit('admin/updatePenaltyTarget', penalty);
  }

  public async saveRuleset() {
    try {
      const { data } = await this.$axios.post(`/api/app/admin/ruleset/${ this.$route.params.category }`, this.$ruleset);
      this.$store.commit('admin/updateRulesets', data);
    } catch(error) {
      return Promise.reject(error);
    }
  }

  public async updateRuleset() {
    try {
      const { data } = await this.$axios.put(`/api/app/admin/ruleset/${ this.$ruleset.id }/${ this.$route.params.category }`, this.$ruleset);
      this.$store.commit('admin/updateRulesets', data);
    } catch(error) {
      return Promise.reject(error);
    }
  }

  public async deleteRuleset(id: number) {
    try {
      const { data } = await this.$axios.delete(`/api/app/admin/ruleset/${ id }/${ this.$route.params.category }`);
      this.$store.commit('admin/updateRulesets', data);
    } catch(error) {
      return Promise.reject(error);
    }
  }

  public async verifyRuleset() {
    try {
      await this.$axios.put(`/api/app/admin/ruleset/verify/${ this.$ruleset.id }/${ this.$route.params.category }`);
      this.$ruleset.verified_at = (new Date()).toJSON();
    } catch(error) {
      return Promise.reject(error);
    }
  }

  public async savePenalty() {
    try {
      const { data } = await this.$axios.post(`/api/app/admin/penalty/${ this.$route.params.category }`, this.$penalty);
      this.$store.commit('admin/updatePenalties', data);
    } catch(error) {
      return Promise.reject(error);
    }
  }

  public async updatePenalty() {
    try {
      const { data } = await this.$axios.put(`/api/app/admin/penalty/${ this.$penalty.id }/${ this.$route.params.category }`, this.$penalty);
      this.$store.commit('admin/updatePenalties', data);
    } catch(error) {
      return Promise.reject(error);
    }
  }

  public async deletePenalty(id: number) {
    try {
      const { data } = await this.$axios.delete(`/api/app/admin/penalty/${ id }/${ this.$route.params.category }`);
      this.$store.commit('admin/updatePenalties', data);
    } catch(error) {
      return Promise.reject(error);
    }
  }

  public async verifyPenalty() {
    try {
      await this.$axios.put(`/api/app/admin/penalty/verify/${ this.$penalty.id }/${ this.$route.params.category }`);
      this.$penalty.verified_at = (new Date()).toJSON();
    } catch(error) {
      return Promise.reject(error);
    }
  }

  public async getAllPenalties() {
    try {
      const { data } = await this.$axios.get(`/api/app/admin/penalties/${ this.$route.params.category }`);
      this.$store.commit('admin/updatePenalties', data);
    } catch(error) {
      return Promise.reject(error);
    }
  }

  public resetRuleset() {
    this.$store.commit('admin/resetRulesetTarget');
  }

  public resetPenalty() {
    this.$store.commit('admin/resetPenaltyTarget');
  }

  /** Application Logs */
}