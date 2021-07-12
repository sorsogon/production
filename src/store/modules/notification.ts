import { VuexModule, Module, Mutation } from 'vuex-module-decorators';

/**
 * ProgressBarModule
 */
@Module({
  namespaced: true,
  name: 'progressBar'
})
export class ProgressBarModule extends VuexModule {
  public _state = false;

  @Mutation
  public toggle() {
    this._state = !this._state;
  }
}

/**
 * SnackBarModule
 */
@Module({
  namespaced: true,
  name: 'snackBar'
})
export class SnackBarModule extends VuexModule {
  public _state = {};

  @Mutation
  public toggle(newState: _object) {
    this._state = newState;
  }
}

@Module({
  namespaced: true,
  name: 'notification',
})
export class AppNotificationModule extends VuexModule {
  public notifications: _object[] = [];

  @Mutation
  public update(updatedNotifications: _object[]) {
    this.notifications = updatedNotifications;
  }
}

@Module({
  namespaced: true,
  name: 'alert'
})
export class NotificationAlertModule extends VuexModule {
  public _state = {};

  @Mutation
  public toggle(newState: _object) {
    this._state = newState;
  }
}