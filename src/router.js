import Vue from 'vue';
import Router from 'vue-router';
import state from './state';

import Home from './views/Home.vue';
import FAQ from './views/FAQ.vue';
import Login from './views/Login.vue';
import TicketsLayout from './components/TicketsLayout.vue';

Vue.use(Router);

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
	},
	{
		path: '/faq',
		name: 'faq',
		component: FAQ,
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
		meta: {
			guest: true,
		},
	},
	{
		path: '/tickets',
		name: 'tickets',
		component: TicketsLayout,
		meta: {
			private: true,
		},
	},
];

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	console.log('to', to.name);
	// 用户路由
	if (to.meta.private && !state.user) {
		// 重定向到登录
		next({ name: 'login', params: { wantedRoute: to.fullPath } });
		return;
	}
	// 访客路由
	if (to.meta.guest && state.user) {
		// 重定向到主页
		next({ name: 'home' });
		return;
	}
	next();
});

export default router;
