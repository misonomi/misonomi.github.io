import Menu from './vue/menu.js'
import Assemble from './vue/assemble.js'
import Accessories from './vue/accessories.js'
import Games from './vue/games.js'
import Programs from './vue/programs.js'
import UnderConstruction from './vue/under_construction.js'

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'rollmenu',
            component: Menu
        },
        {
            path: '/assemble',
            component: Assemble
        },
        {
            path: '/accessories',
            component: Accessories
        },
        {
            path: '/kisekae',
            component: Games
        },
        {
            path: '/programs',
            component: Programs
        },
        {
            path: '/under_construction',
            component: UnderConstruction
        },
    ],
})
