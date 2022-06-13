<template>
    <echarts-stack-horizontal ref="echarts" :data-fun="getDataFun()"></echarts-stack-horizontal>
</template>

<script>
import echartsStackHorizontal from '@/components/cockpit/base/echarts-stack-horizontal'
import {getBreakLine} from '@/api/cockpit/cockpit'

export default {
    name: 'breakLine',
    components: {echartsStackHorizontal},
    methods: {
        getDataFun() {
            return getBreakLine
        },
        init(width, height) {
            this.$refs.echarts.init(width, height)
        },
        refresh() {
            this.$refs.echarts.refresh()
        }
    }
}
</script>