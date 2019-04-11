import Menu from './vue/menu.js';

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'menu',
            component: Menu
        },
        {
            path: '/assemble',
            name: 'assemble',
            component: () => import('./vue/assemble.js')
        },
    ]
})

export default router
