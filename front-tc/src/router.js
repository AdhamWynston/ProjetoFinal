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
        { path: '', component: load('Home') },
        { path: '/home', component: load('Home'), name: 'home', meta: { auth: true } },
        { path: '/clients', component: load('modules/Clients/List'), name: 'clients.list', meta: { auth: true } },
        { path: '/clients/create', component: load('modules/Clients/Create'), name: 'clients.create', meta: { auth: true } },
        {
          path: '/clients/:id',
          component: load('modules/Clients/View'),
          name: 'clients.view'
        },
        { path: '/clients/:id/edit', component: load('modules/Clients/Edit'), name: 'clients.edit', meta: { auth: true } },
        { path: '/employees', component: load('modules/Employees/List'), name: 'employees.list', meta: { auth: true } },
        { path: '/employees/create', component: load('modules/Employees/Create'), name: 'employees.create', meta: { auth: true } },
        {
          path: '/employees/:id',
          component: load('modules/Employees/View'),
          name: 'employees.view'
        },
        { path: '/employees/:id/edit', component: load('modules/Employees/Edit'), name: 'employees.edit', meta: { auth: true } },
        { path: '/admin/users', component: load('modules/Users/List'), name: 'admin.users.list', meta: { auth: true } }
      ]
    },
    { path: '/login', component: load('modules/Auth/Login'), name: 'login' },
    // Always leave this last one
    { path: '*', component: load('Error404') } // Not found
  ]
})
