import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/cockpit',
    name: 'cockpit',
    component: () => import('@/views/cockpit/cockpit')
}]

export default new VueRouter({
    routes
})
