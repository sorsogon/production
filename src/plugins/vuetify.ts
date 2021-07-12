import Vuetify from "vuetify/lib/framework";

export default Vuetify;

export const vuetify = new Vuetify({
  icons: {
    iconfont: "mdiSvg",
  },

  /** default-ui-theme */
  theme: {
    themes: {
      light: {
        main: "#1c3b53",
        // main: '#164bba',
        // main: '#255070'
      },
      dark: {},
    },
    dark: false,
  },
});
