<template>
    <div class="layout1-container" :style="{width: containerWidth + 'px', height: containerHeight + 'px'}">
        <div v-if="title" class="name-title">{{ title }}</div>
        <slot v-if="!split"/>
        <ul v-else class="teacher-pie clearfix">
            <slot/>
        </ul>
        <span class="top-left border-span"></span>
        <span class="top-right border-span"></span>
        <span class="bottom-left border-span"></span>
        <span class="bottom-right border-span"></span>
    </div>
</template>

<script>
export default {
    name: 'layout1Container',
    props: {
        title: {
            type: String
        },
        split: {
            type: Boolean,
            default: false
        },
        height: {
            type: String,
            default: '100'
        }
    },
    data() {
        return {
            children: [],
            containerWidth: 0,
            containerHeight: 0
        }
    },
    created() {
        const child = {
            component: this
        }
        if (this.split) {
            child.children = this.children
        }
        this.$parent.children.push(child)
    },
    methods: {
        init(width, height) {
            this.containerWidth = width
            this.containerHeight = height

            if (this.split) {
                width -= 2
                for (let child of this.children) {
                    const li = child.component
                    const liWidth = width * parseInt(li.width) / 100
                    li.init(liWidth, height)
                }
            } else if (this.$children.length > 0) {
                width -= 10
                // if (this.title) {
                //     height -= 5
                // }
                this.$children[0].init(width, height - 20)
            }
        }
    }
}
</script>