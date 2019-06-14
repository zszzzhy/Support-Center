import Vue from 'vue';
import Router from 'vue-router';
import state from './state';

import NotFound from './views/NotFound.vue';
import Home from './views/Home.vue';
import FAQ from './views/FAQ.vue';
import Login from './views/Login.vue';
import TicketsLayout from './views/TicketsLayout.vue';
import Tickets from './views/Tickets.vue';
import NewTicket from './views/NewTicket.vue';
import Ticket from './views/Ticket.vue';

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
			{ path: ':id', name: 'ticket', component: Ticket, props: true },
		],
	},
	{
		path: '*',
		component: NotFound,
	},
];

const router = new Router({
	routes,
	mode: 'history',
	// 滚动行为
	scrollBehavior(to, from, savedPosition) {
		// 如果有滚动位置，可以恢复该滚动位置
		if (savedPosition) {
			return savedPosition;
		}
		// 路由是否有模仿浏览器行为的散列值
		if (to.hash) {
			return { selector: to.hash };
		}
		// 路由改变时滚动到页面的顶部
		return { x: 0, y: 0 };
	},
});

// 路由守卫
router.beforeEach((to, from, next) => {
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
