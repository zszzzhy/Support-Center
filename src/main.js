import Vue from 'vue';
import App from './App.vue';
import router from './router';
import state from './state';

import './global-components';
import State from './plugins/state';
import Fetch, { $fetch } from './plugins/fetch';

Vue.use(State, state);
Vue.use(Fetch, {
	baseUrl: 'http://localhost:3000/',
});

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
