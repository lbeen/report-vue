<template>
    <el-container style=" border: 1px solid #eee">
        <el-aside width="200px">
            <el-menu :default-active="activeMenu" class="el-menu-demo" @select="goto"
                     :style="{height: height+ 'px'}">
                <template v-for="menu in menus">
                    <el-submenu v-if="menu.children" :index="menu.index" v-bind:key="menu.index">
                        <template slot="title">{{ menu.name }}</template>
                        <el-menu-item v-for="child in menu.children" :index="child.index" v-bind:key="child.index">
                            {{ child.name }}
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item v-else :index="menu.index" v-bind:key="menu.index">
                        {{ menu.name }}
                    </el-menu-item>
                </template>
            </el-menu>
        </el-aside>
        <el-main>
            <router-view/>
        </el-main>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            height: '',

            activeMenu: '',
            menus: [{
                index: 'kanban',
                name: '看板配置',
                children: [{
                    index: '/manage/kanban/page',
                    name: '页面配置'
                }, {
                    index: '/manage/kanban/resource',
                    name: '资源配置'
                }]
            }]
        }
    },
    created() {
        this.setHeight()
        window.addEventListener("resize", this.setHeight)

        const path = this.$router.history.current.path
        if (path === '/manage') {
            this.activeMenu = this.menus[0].children[0].index
            this.goto(this.activeMenu)
        } else {
            this.activeMenu = path
        }
    },
    methods: {
        setHeight() {
            this.height = window.innerHeight - 20 + 'px'
        },
        goto(index) {
            if (this.$router.history.current.path === index) {
                return
            }
            this.$router.push(index)
        }
    }
}
</script>