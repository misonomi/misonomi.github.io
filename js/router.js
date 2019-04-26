import Menu from './vue/menu.js.js'
import Assemble from './vue/assemble.js.js'
import Accessories from './vue/accessories.js.js'
import Games from './vue/kisekae.js.js'
import Programs from './vue/programs.js.js'
import UnderConstruction from './vue/under_construction.js.js'

export default new VueRouter({
    routes: [
        {
            path: '/',
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
    ]
})
