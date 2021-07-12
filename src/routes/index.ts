/**
 * @/routes - This file is responsible for managing the routing of our web application.
 * 
 */
import { RouteConfig } from 'vue-router';

import AuthRoutes from './auth';
import DashboardRoutes from './dashboard';
import SettingsRoutes from './settings';
import AppRoutes from './app';

export const routes: RouteConfig[] = [

  ...AuthRoutes,
  ...DashboardRoutes,
  ...SettingsRoutes,
  ...AppRoutes,

  {
    path: '*',
    redirect: '/dashboard'
  }

];