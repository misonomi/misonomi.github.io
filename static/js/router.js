import Menu from './vue/menu.js';
import Assemble from './vue/assemble.js';
import Accessories from './vue/accessories.js';

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
            component: Assemble
        },
        {
            path: '/accessories',
            name: 'accessories',
            component: Accessories
        },
    ]
})
