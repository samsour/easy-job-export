import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import VCalendar from 'v-calendar';

Vue.use(VCalendar, {
  firstDayOfWeek: 2,  // Monday
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
