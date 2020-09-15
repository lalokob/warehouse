
const routes = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{ path: '', component: () => import('pages/Index.vue') }
		]
	},
	{
		path: '/contador',
		component: () => import('layouts/CounterLy.vue'),
		children: [
			{ path: '', component: () => import('pages/Counter/Index.vue') }
		]
	},
	{
		path: '/ubicador',
		component: () => import('layouts/LocatorLy.vue'),
		children: [
			{ path: '', component: () => import('pages/Locator/Index.vue') }
		]
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '*',
		component: () => import('pages/Error404.vue')
	}
]

export default routes
