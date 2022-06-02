import Vue from 'vue'
import VueRouter from 'vue-router'
import cockpit from '@/views/cockpit/cockpit'

Vue.use(VueRouter)

const routes = [{
    path: '/cockpit',
    name: 'cockpit',
    component: cockpit
}]

export default new VueRouter({
    routes
})
