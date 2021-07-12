import Dexie, { Table, DexieOptions } from 'dexie';
import { UserModuleInterface } from '@/store/modules/user';

import { user } from './schemas';

export class StoreDatabase extends Dexie {
  public user: Table<UserModuleInterface>;

  constructor(dbname: string, options?: DexieOptions) {
    super(dbname, options);
    this.version(1).stores({ user });
    this.user = this.table('user');
  }

}


export default new StoreDatabase('pgstoapp', { autoOpen: true });
