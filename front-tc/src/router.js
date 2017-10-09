import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}
export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    {
      path: '/',
      component: load('Index'),
      children: [
        { path: '/', component: load('Charts'), name: 'index', meta: { auth: true } },
        { path: '/clients', component: load('Clients/List'), name: 'clients.list', meta: { auth: true } },
        { path: '/clients/create', component: load('Clients/Create'), name: 'clients.create', meta: { auth: true } },
        {
          path: '/clients/:id',
          component: load('Clients/View'),
          name: 'clients.view',
          children: [
            { path: 'edit', component: load('Clients/Edit'), name: 'clients.edit', meta: { auth: true } }
          ]
        },
        { path: '/admin/users', component: load('Users/List'), name: 'admin.users.list', meta: { auth: true } }
      ]
    },
    { path: '/login', component: load('Auth/Login'), name: 'login' },
    // Always leave this last one
    { path: '*', component: load('Error404') } // Not found
  ]
})
