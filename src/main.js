import Vue from 'vue'
import router from './router'
import 'babel-polyfill'
import App from './App.vue'
import dataV from '@jiaminghi/data-view'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(dataV)
Vue.use(ElementUI)
Vue.config.productionTip = false

export default new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
