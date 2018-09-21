
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

const app = new Vue({
    el: '#app'
});
