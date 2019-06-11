import Vue from 'vue';
import App from './App.vue';
import router from './router';
import state from './state';

import './global-components';
import State from './plugins/state';
import Fetch, { $fetch } from './plugins/fetch';

import * as filters from './filters';

Vue.use(State, state);
Vue.use(Fetch, {
	baseUrl: 'http://localhost:3000/',
});

for (const key in filters) {
	Vue.filter(key, filters[key]);
}

Vue.config.productionTip = false;

async function main() {
	// 获取用户信息
	try {
		state.user = await $fetch('user');
	} catch (err) {
		console.warn(err);
	}
	// 启动应用
	new Vue({
		data: state,
		router,
		render: h => h(App),
	}).$mount('#app');
}

main();
