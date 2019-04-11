import Menu from './vue/menu.js';

export default new VueRouter({
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
        {
            path: '/accessories',
            name: 'accessories',
            component: () => import('./vue/accessories.js')
        },
    ]
})
