import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/manage',
    component: () => import('@/views/manage/manage'),
    children: [{
        path: 'kanban/page',
        component: () => import('@/views/manage/kanban/page')
    }, {
        path: 'kanban/resource',
        component: () => import('@/views/manage/kanban/resource')
    }]
}, {
    path: '/cockpit',
    component: () => import('@/views/cockpit/cockpit')
}, {
    path: '/kanban',
    component: () => import('@/views/kanban/kanban'),
}, {
    path: '/kanban/ppt',
    component: () => import('@/views/kanban/ppt')
}, {
    path: '/kanban/video',
    component: () => import('@/views/kanban/video')
}, {
    path: '/kanban/machine/cutoff',
    component: () => import('@/views/kanban/machine/cutoff')
}, {
    path: '/kanban/machine/butt',
    component: () => import('@/views/kanban/machine/butt')
}, {
    path: '/kanban/machine/polishing',
    component: () => import('@/views/kanban/machine/polishing')
}, {
    path: '/kanban/machine/butt-polishing',
    component: () => import('@/views/kanban/machine/butt-polishing')
}, {
    path: '/kanban/machine/finish',
    component: () => import('@/views/kanban/machine/finish')
}]

export default new VueRouter({
    routes
})
