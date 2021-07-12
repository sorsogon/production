import Vue, { PluginObject } from 'vue';
import Dexie, { DexieOptions } from 'dexie';
import { StoreDatabase } from '@/store/db';

export default new class implements PluginObject<_DexieOptions> {
  public service?: Dexie;

  public async install(_Vue: typeof Vue, options?: _DexieOptions) {
    const { dbname, options: opts } = options ? options : {
      dbname: 'default',
      options: {
        autoOpen: true,
      } as DexieOptions
    }

    this.service = new StoreDatabase(dbname, opts);
    _Vue.prototype.$dexie = this.service;
  }

}
