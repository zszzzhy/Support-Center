import Vue from 'vue';
import Router from 'vue-router';
import state from './state';

import Home from './views/Home.vue';
import FAQ from './views/FAQ.vue';
import Login from './views/Login.vue';
import TicketsLayout from './components/TicketsLayout.vue';
import Tickets from './components/Tickets.vue';
import NewTicket from './components/NewTicket.vue';

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
		component: TicketsLayout,
		meta: {
			private: true,
		},
		children: [
			{ path: '', name: 'tickets', component: Tickets },
			{ path: 'new', name: 'new-ticket', component: NewTicket },
		],
	},
];

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
	console.log('to', to.name);
	// 用户路由
	if (to.matched.some(r => r.meta.private) && !state.user) {
		// 重定向到登录
		next({ name: 'login', params: { wantedRoute: to.fullPath } });
		return;
	}
	// 访客路由
	if (to.matched.some(r => r.meta.guest) && state.user) {
		// 重定向到主页
		next({ name: 'home' });
		return;
	}
	next();
});

export default router;
