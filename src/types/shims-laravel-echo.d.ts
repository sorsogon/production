import Echo from 'laravel-echo';

declare module 'vue/types/vue' {
  interface Vue {
    $echo: Echo
  }
}

 