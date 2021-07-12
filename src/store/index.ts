import Vuex from 'vuex';

import { UserModule } from './modules/user';
import { CollectorModule } from './modules/collector';
import { ProgressBarModule, SnackBarModule, AppNotificationModule, NotificationAlertModule } from './modules/notification';
import { PayerModule } from './modules/payer';
import { AdminModule } from './modules/admin';
import { CashierModule } from './modules/cashier';

export default new Vuex.Store({
  modules: {
    progressBar: ProgressBarModule,
    snackBar: SnackBarModule,
    user: UserModule,
    collector: CollectorModule,
    payer: PayerModule,
    notification: AppNotificationModule,
    admin: AdminModule,
    alert: NotificationAlertModule,
    cashier: CashierModule
  }
});
