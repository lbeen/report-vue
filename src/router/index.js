import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/cockpit',
    component: () => import('@/views/cockpit/cockpit')
}, {
    path: '/manage',
    component: () => import('@/views/manage/manage'),
    children: [{
        path: 'kanban/page',
        component: () => import('@/views/manage/kanban/page')
    }, {
        path: 'kanban/resource',
        component: () => import('@/views/manage/kanban/resource')
    }]
}]

export default new VueRouter({
    routes
})
