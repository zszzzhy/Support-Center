import Vue from 'vue';
import App from './App.vue';
import router from './router';
import state from './state';

import './global-components';
import State from './plugins/state';
import Fetch from './plugins/fetch';

Vue.use(State, state);
Vue.use(Fetch, {
	baseUrl: 'http://localhost:3000/',
});

Vue.config.productionTip = false;

new Vue({
	data: state,
	router,
	render: h => h(App),
}).$mount('#app');
