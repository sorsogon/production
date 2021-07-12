import Vue, { PluginObject } from 'vue';


export default new class implements PluginObject<undefined> {
  public install(_Vue: typeof Vue) {
    /**
     * 
     */
    Vue.filter('formatDateString', (date: Date) => {
      const dateString = date.toLocaleDateString();

      const time: any[] = [ date.getHours(), date.getMinutes(), date.getSeconds() ];

      time.forEach((mem, i) => {
        time[i] = mem < 10 ? `0${mem}` : mem == 24 ? '00' : mem;
      });

      return dateString + ' ' + time.join(':');
    });

    /**
     * 
     */
    Vue.filter('formatAddress', (address: _object) => {
      return `${address.city}, ${address.barangay}`;
    });

    /**
     * 
     */
    Vue.filter('formatCurrency', (num: string | number) => {
      num = num ?? 0;

      return '₱ ' + num.toLocaleString('us', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    });

    /**
     * 
     */
    Vue.filter('formatTimeString', (num: number) => {
      return Math.round(num/1e3);
    });
  }
}
