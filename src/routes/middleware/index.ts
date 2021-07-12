import Router, { Route } from 'vue-router';
import $store from '@/store';

function haveNavigateableRoute(to: Route, allowedRoles: string[]) {
  for (const elem of allowedRoles) {
    const [ role, onlyNavigateableRoute ] = elem.split(':');

    if (to.path === onlyNavigateableRoute) return true;
  }

  return false;
}

function checkRoles(elem: string, _role: string) {
  const [ role, onlyNavigateableRoute ] = elem.split(':');

  return role === _role && !onlyNavigateableRoute;
}

export function initRouterMiddleware(router: Router): Router {
  router.beforeResolve(async (to, from, next) => {
    
    const { parse } = JSON;
    const  { authenticatedUserOnly, unauthenticatedUserOnly } = to.meta;
    const allowedRoles: string[] = to.meta.allowedRoles ?? [];

    try {
      const user = parse(localStorage.getItem('user') as string);
      if (user == null) throw Error();

      $store.dispatch('user/update', user);
      $store.dispatch('user/update');

      // Routes that are only for unauthenticated/unauthorized users are prevented
      // from being navigated to by signed in users.
      //
      // (allowedRoles.findIndex(elem => checkRoles(elem, user.role.name)) == -1    =>     If the role is not found within the allowedRoles or a navigateable route is present.
      if (unauthenticatedUserOnly || (allowedRoles.findIndex(elem => checkRoles(elem, user.role.name)) == -1 && allowedRoles.length > 0))
        if (user.role.name === 'payer') {
          next({ name: 'd-tp-profile-stats' });
        } else {
          if (haveNavigateableRoute(to, allowedRoles)) {
            for (const elem of allowedRoles) {
              const [ role, onlyNavigateableRoute ] = elem.split(':');
    
              if (role === user.role.name && onlyNavigateableRoute) {
                return next();
              }
            }
          }

          next({ name: 'dashboard-root-page' });
        }
      else
        next();

      
      
    } catch(error) {
      // Routes that are only accessible by authenticated users.
      if (authenticatedUserOnly) next({ name: 'auth-signin-page' });
      else next();
    }
  });



  return router;
}


