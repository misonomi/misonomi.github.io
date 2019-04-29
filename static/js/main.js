import App from './vue/app.js'
import router from './router.js'

new Vue({
    router,
    mode: 'history',
    render: h => h(App),
}).$mount(`#app`)
