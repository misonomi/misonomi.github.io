import App from './vue/app.js.js'
import router from './router.js.js'

new Vue({
    router,
    render: h => h(App),
}).$mount(`#app`)
