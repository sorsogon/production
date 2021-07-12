import { Vue, Component } from 'vue-property-decorator';
import { UserModuleInterface } from '@/store/modules/user';

declare module 'vue/types/vue' {
  interface Vue {
    $user: UserModuleInterface;

    $allUserNotifications: _object[];
    $notifications: _object[];
    $activities: _object[];

    updatePayerProfile(data: HTMLFormElement): void;
    updateProfilePicture(form: HTMLFormElement): void;
    updateUserTheme(): Promise<void>;
    
    updateUserNotification(): void;
    updateNotificationStatus(notification: _object): Promise<any>;

    getPayerLocation(): void;

    formatCurrency(num: string | number): string;
    hideCategoryControl(exclude: string[]): boolean;
  }
}

@Component
export default class UserServiceMixin extends Vue.mixin({}) {
  /**
   * 
   * @returns UserModuleInterface
   */
  get $user(): UserModuleInterface {
    return this.$store.state.user._state as UserModuleInterface;
  }

  get $allUserNotifications() {
    return this.$store.state.notification.notifications ?? [];
  }

  /**
   * 
   * @returns _object[]
   */
  get $notifications(): _object[] {
    const S = this.$store.state.notification.notifications as _object[];
    return S.filter((elem: _object) => elem.type == 'app');
  }

  get $activities(): _object[] {
    const S = this.$store.state.notification.notifications as _object[];
    return S.filter((elem: _object) => elem.type == 'activity');
  }

  /**
   * 
   * @param _object
   */
  public async updateUserNotification() {
    try {
      const { data } = await this.$axios.get('/auth/user/notifications');
      this.$store.commit('notification/update', data);
    } catch(error) {
      return Promise.reject(error);
    }
  }

  /**
   * 
   * @param _object
   */
  public async updateNotificationStatus(notification: _object) {
    try {
      await this.$axios.post(`/auth/user/notifications/${ notification.id }`);

      if (notification.seen) return;

      notification.seen = true;

      if (this.$route.fullPath != notification.url) 
        window.location.href = notification.url;
      else
        window.location.reload();
    } catch(error) {
      return Promise.reject(error);
    }
  }

  /**
   *  Updates the user information from the server (POST)
   * 
   * @param form 
   */
   public async updatePayerProfile(form: HTMLFormElement) {
    

    const elem = form.elements;
    const data = new FormData(form);

    const residence_province = elem.namedItem('residence_province') as _object;
    const residence_city = elem.namedItem('residence_city') as _object;
    const residence_barangay = elem.namedItem('residence_barangay') as _object;
    const permanent_province = elem.namedItem('permanent_province') as _object;
    const permanent_city = elem.namedItem('permanent_city') as _object;
    const permanent_barangay = elem.namedItem('permanent_barangay') as _object;

    data.set('residence_province', residence_province._value.name ?? residence_province.value);
    data.set('residence_city', residence_city._value.name ?? residence_city.value);
    data.set('residence_barangay', residence_barangay._value.name ?? residence_barangay.value);
    data.set('permanent_province', permanent_province._value.name ?? permanent_province.value);
    data.set('permanent_city', permanent_city._value.name ?? permanent_city.value);
    data.set('permanent_barangay', permanent_barangay._value.name ?? permanent_barangay.value);
    
    try {
      const { data: user } = await this.$axios.post('/api/app/payer/update', data);      
      this.$store.dispatch('user/update', user);
      this.$router.back();
    } catch(error) {
      return Promise.reject(error);
    }

    
  }

  /**
   * 
   * @param form 
   */
  public async updateProfilePicture(form: HTMLFormElement) {
    const picture = new FormData(form);

    try {
      const { data: user } = await this.$axios.post('/api/app/payer/update', picture);
      this.$store.dispatch('user/update', user);
    } catch(error) {
      return Promise.reject(error);
    }
  }

  /**
   * 
   * @param form
   */
  public async updateUserTheme() {
    try {
      await this.$axios.put(`/api/app/payer/theme`);
      await this.$store.dispatch('user/update');
    } catch(error) {
      return Promise.reject(error);
    }
  }

  /**
   * 
   */
  public async getPayerLocation() {
    try {
      const { data } = await this.$axios.get('/auth/user/location');
      console.log(data);
    } catch(error) {
      console.log(error);
    }
  }

  /**
   * 
   */
  public formatCurrency(num: string | number): string {
    num = parseFloat(num.toString()) ?? 0;
    const span = document.createElement('span');

    span.innerHTML = '₱ ' + num.toLocaleString('us', {minimumFractionDigits: 2, maximumFractionDigits: 2});

    if (num < 1000) span.classList.add('primary--text'), span.classList.add('main--text');
    else if (num < 1e4) span.classList.add('warning--text');
    else if (num > 1e4) span.classList.add('error--text');

    return span.outerHTML;
  }

  /**
   * 
   */
  public hideCategoryControl(exclude: string[]): boolean {
    return exclude.find(elem => (this.$route.params.category as string) === elem) ? false : true;
  }
}
