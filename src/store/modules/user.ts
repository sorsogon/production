import { VuexModule, Module, MutationAction, Action } from 'vuex-module-decorators';
import axios from '@/plugins/axios';

const $axios = axios.service;

interface AddressInterface {
  province: string;
  district: number;
  city: string;
  barangay: string;
  address_line: string;
}

export interface UserModuleInterface {
  id?: number;               name?: string;         gender?: string;             updated_at?: Date;
  avatar?: string;          email?: string;        birthdate?: Date;            role_id?: number;
  google_id?: number;       mobile?: string;       created_at?: Date;

  permanent?: AddressInterface;
  residence?: AddressInterface;
  profile?: {
    organization?: string;
    profession?: string;
    status?: string;
    primary_edu?: string;
    relationship_status?: string;
    website_url?: string;
    secondary_edu?: string;
    tertiary_edu?: string;
    company_id?: number;
    tin_id?: number;
    document?: Blob;
    config?: _object;
  };
  role?: {
    name?: string;
    permissions?: _object;
  }
}

/**
 * UserModule
 */
@Module({
  namespaced: true,
  name: 'user'
})
export class UserModule extends VuexModule {
  public _state: UserModuleInterface = {};

  @MutationAction({ mutate: ['_state'] })
  async update(data: _object) {
    const { parse } = JSON;
    try {
      const user = data ? data : (await $axios.get('/auth/user')).data;
      
      if (user.address) {
        [user.permanent, user.residence] = [user.address.permanent, user.address.residence];
        delete user.address;
      }

      localStorage.setItem('user', JSON.stringify(user));
      return { _state: user as UserModuleInterface };
    } catch(error) {
      error;
    }

    return { _state: parse(localStorage.getItem('user') as string) };
  }

  @Action
  async logout(): Promise<void> {
    try {
      await $axios.put('/auth/logout');
    } catch(error) {
      console.log(error);
    }
  }

}
