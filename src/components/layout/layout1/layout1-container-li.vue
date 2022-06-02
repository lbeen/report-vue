<template>
    <li :style="{width: liWidth + 'px', height: liHeight + 'px'}">
        <div v-if="title" class="name-title">{{ title }}</div>
        <div>
            <slot/>
        </div>
    </li>
</template>

<script>
export default {
    name: 'layout1ContainerLi',
    props: {
        title: {
            type: String
        },
        width: {
            type: String,
            default: '50'
        }
    },
    data() {
        return {
            liWidth: 0,
            liHeight: 0
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
            this.liWidth = width
            this.liHeight = height
            if (this.$children.length > 0) {
                this.$children[0].init(width, height - 25)
            }
        }
    }
}
</script>