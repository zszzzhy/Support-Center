import Vue from 'vue';
import App from './App.vue';
import router from './router';

import './global-components';
import Fetch from './plugins/fetch';

Vue.use(Fetch, {
	baseUrl: 'http://localhost:3000/',
});

Vue.config.productionTip = false;

new Vue({
	router,
	render: h => h(App),
}).$mount('#app');
