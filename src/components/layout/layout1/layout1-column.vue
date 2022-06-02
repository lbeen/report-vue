<template>
    <div class="layout1-column" :style="{width: columnWidth + 'px'}">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'layout1Column',
    props: {
        width: {
            type: String,
            default: '100'
        }
    },
    data() {
        return {
            children: [],
            columnWidth: 0
        }
    },
    created() {
        this.$parent.children.push({
            component: this,
            children: this.children
        })
    },
    methods: {
        init(width, height) {
            this.columnWidth = width

            height -= 15 * this.children.length + 10
            for (let child of this.children) {
                const container = child.component
                const containerHeight = height * parseInt(container.height) / 100
                container.init(width, containerHeight)
            }
        }
    }
}
</script>