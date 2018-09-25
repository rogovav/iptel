
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

//Vue.http.headers.common['X-CSRF-TOKEN'] = Laravel.csrfToken;

Vue.component(
    'buildings',
    require ('./components/Buildings.vue')
);

Vue.component(
    'groups',
    require ('./components/Groups.vue')
);

Vue.component(
    'clients',
    require ('./components/Clients.vue')
);

const app = new Vue({
    el: '#app'
});
