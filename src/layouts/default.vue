<!--
  layout: AuthLayout
  desc: Isang vue-layout na dapat gamitin ng isang indibidwal na may permiso.
-->
<template>
  <div id="app-vuetify-root">
    <v-app>
      <v-app-bar color="main" dark app>
        <v-app-bar-nav-icon
          class="d-lg-none"
          @click.stop="onAppDrawerToggle"
        ></v-app-bar-nav-icon>

        <v-responsive
          v-if="$vuetify.breakpoint.smAndDown">
          <v-sheet class="transparent d-flex align-center">
            <v-img
              max-width="45"
              src="@/assets/images/png/sorsogon-logo.png"
            ></v-img>

            <h5 class="text-h4 ml-2 font-weight-medium text-uppercase text-h6">Ptms</h5>
          </v-sheet>
        </v-responsive>

        <v-spacer></v-spacer>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn 
              to="/app/mailbox"
              icon>
              <v-img
                max-width="26"
                src="@/assets/images/png/iconpack/mail-1007.png"
                v-bind="attrs"
                v-on="on"
              ></v-img>
            </v-btn>
          </template>
          <span>Mailbox</span>
        </v-tooltip>

        <AppNotificationDropdown />
        <AppProfileDropdown />
      </v-app-bar>

      <AppSnackBar />
      <NotificationAlert />

      <v-navigation-drawer
        app
        dark
        color="main"
        class="elevation-2"
        v-model="appDrawerState"
      >
        <AppSideNavigation />
      </v-navigation-drawer>

      <v-main>
        <AppProgressBar />
        <transition name="fade">
          <router-view class="pl-4 pr-4"></router-view>
        </transition>
      </v-main>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

import NotificationAlert from "@/components/app/NotificationAlert.vue";
import AppNotificationDropdown from "@/components/app/dropdown/AppNotificationDropdown.vue";
import AppProfileDropdown from "@/components/app/dropdown/AppProfileDropdown.vue";
import AppSideNavigation from "@/components/app/AppSideNavigation.vue";
import AppProgressBar from "@/components/app/AppProgressBar.vue";
import AppSnackBar from "@/components/app/AppSnackBar.vue";

@Component({
  components: {
    NotificationAlert,
    AppNotificationDropdown,
    AppProfileDropdown,
    AppSideNavigation,
    AppProgressBar,
    AppSnackBar,
  },
})
export default class AuthLayout extends Vue {
  public appDrawerState = true;

  public onAppDrawerToggle(): void {
    this.appDrawerState = !this.appDrawerState;
  }

  public created() {
    this.$root.updateUserNotification();

    const callback = async () => {
      try {
        await this.$root.updateUserNotification();

        this.$store.commit('alert/toggle', {
          toggle: true
        });

      } catch(error) {
        console.log(error);
      }
    };

    switch (this.$user.role?.name as string) {
    case 'developer':
      this.$echo.channel(`App.Models.User.${this.$user.id}`)
        .listen('Notification.Taxpayer.NewUser', callback)
        .listen('Notification.Taxpayer.NewPayment', callback)
        .listen('Notification.Taxpayer.GrantedUser', async () => {

          try {
            await this.$store.dispatch('user/update');
          } catch(error) {
            console.log(error);
          }

          callback();
        })
        .listen('Notification.Taxpayer.DeniedUser', callback)
        .listen('Notification.Taxpayer.DocumentGranted', callback)
        .listen('Notification.Taxpayer.DocumentDenied', callback)
        .listen('Notification.Taxpayer.DocumentUpload', callback)
        .listen('Notification.Taxpayer.AddedCategory', callback)
        .listen('Notification.Taxpayer.AddedBusiness', callback)
        .listen('Notification.Taxpayer.AddedVehicle', callback)
        .listen('Notification.Taxpayer.PaymentSuccess', callback)
        
        .listen('Notification.Admin.AddedRuleset', callback)
        .listen('Notification.Admin.DeletedRuleset', callback)
        .listen('Notification.Admin.UpdatedRuleset', callback)
        .listen('Notification.Admin.AddedUser', callback)
        .listen('Notification.Admin.DeletedUser', callback)
        .listen('Notification.Admin.UpdatedUser', callback)

        .listen('Notification.Collector.GeneratedReport', callback)
        .listen('Notification.Collector.NewDocumentAdded', callback)

        .listen('Notification.Cashier.GeneratedReport', callback);

      break;
    case 'payer':
      this.$echo.channel(`App.Models.User.${this.$user.id}`)
        .listen('Notification.Taxpayer.NewUser', callback)
        .listen('Notification.Taxpayer.NewPayment', callback)
        .listen('Notification.Taxpayer.GrantedUser', async () => {

          try {
            await this.$store.dispatch('user/update');
          } catch(error) {
            console.log(error);
          }

          callback();
        })
        .listen('Notification.Taxpayer.DeniedUser', callback)
        .listen('Notification.Taxpayer.DocumentGranted', callback)
        .listen('Notification.Taxpayer.DocumentDenied', callback)
        .listen('Notification.Taxpayer.DocumentUpload', callback)
        .listen('Notification.Taxpayer.AddedCategory', callback)
        .listen('Notification.Taxpayer.AddedBusiness', callback)
        .listen('Notification.Taxpayer.AddedVehicle', callback)
        .listen('Notification.Taxpayer.PaymentSuccess', callback);

      break;
    case 'admin':
      this.$echo.channel(`App.Models.User.${ this.$user.id }`)
        .listen('Notification.Admin.AddedRuleset', callback)
        .listen('Notification.Admin.DeletedRuleset', callback)
        .listen('Notification.Admin.UpdatedRuleset', callback)
        .listen('Notification.Admin.AddedUser', callback)
        .listen('Notification.Admin.DeletedUser', callback)
        .listen('Notification.Admin.UpdatedUser', callback);
      
      break;
    case 'collector':
      this.$echo.channel(`App.Models.User.${ this.$user.id }`)
        .listen('Notification.Collector.GeneratedReport', callback)
        .listen('Notification.Collector.NewDocumentAdded', callback);

      break;
    case 'cashier':
      this.$echo.channel(`App.Models.User.${ this.$user.id }`)
        .listen('Notification.Cashier.GeneratedReport', callback);
      break;
    }

  }

  get $profile() {
    return this.$user.profile ?? {};
  }

  get $user() {
    return this.$root.$user;
  }

  @Watch('$profile', { immediate: true })
  public onProfilePropertyChanged() {
    
    if (this.$profile.config?.theme == 'light') this.$vuetify.theme.dark = false;
    else this.$vuetify.theme.dark = true;

  }
}
</script>
