<template>
    <div class="layout1">
        <layout1-header :title="title"></layout1-header>
        <slot/>
    </div>
</template>

<script>
import '@/assets/layout/layout1/css/layout1.css'
import layout1Header from '@/components/layout/layout1/layout1-header'

export default {
    name: 'layout1',
    components: {
        layout1Header
    },
    props: {
        title: {
            type: String,
            require: true
        },
        interval: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            children: [],
            leafs: [],
            leafIndex: 0
        }
    },
    mounted() {
        const width = window.innerWidth - 15 * (this.children.length + 1)
        const height = window.innerHeight - 85
        for (let child of this.children) {
            const column = child.component
            const columnWidth = width * parseInt(column.width) / 100
            column.init(columnWidth, height)
        }

        if (this.interval > 0) {
            for (let child of this.children) {
                this.getAllLeaf(child)
            }
            this.refreshInterval()
        }
    },
    methods: {
        getAllLeaf(node) {
            const children = node.children
            if (!children) {
                const leaf = node.component.$children[0]
                if (leaf) {
                    this.leafs.push(leaf)
                }
                return
            }
            for (let child of children) {
                this.getAllLeaf(child)
            }
        },
        refreshInterval() {
            setInterval(() => {
                this.leafs[this.leafIndex].refresh()
                if (this.leafIndex === this.leafs.length - 1) {
                    this.leafIndex = 0
                } else {
                    this.leafIndex++
                }
            }, this.interval)
        }
    }
}
</script>