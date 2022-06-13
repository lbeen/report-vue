<template>
    <echarts-stack-horizontal ref="echarts" :data-fun="getDataFun()"></echarts-stack-horizontal>
</template>

<script>
import echartsStackHorizontal from '@/components/cockpit/base/echarts-stack-horizontal'
import {getMachineOnline48} from '@/api/cockpit/cockpit'

export default {
    name: 'machineOnline48',
    components: {echartsStackHorizontal},
    methods: {
        getDataFun() {
            return getMachineOnline48
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