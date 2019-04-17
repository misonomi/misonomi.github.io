import Menu from './vue/menu.js'
import Assemble from './vue/assemble.js'
import Accessories from './vue/accessories.js'
import Games from './vue/kisekae.js'
import Programs from './vue/programs.js'
import UnderConstruction from './vue/under_construction.js'

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
        {
            path: '/kisekae',
            name: 'games',
            component: Games
        },
        {
            path: '/programs',
            name: 'programs',
            component: Programs
        },
        {
            path: '/under_construction',
            name: 'under_construction',
            component: UnderConstruction
        },
    ]
})
