<template>
    <echarts-bar ref="echarts" :data-fun="getDataFun()"></echarts-bar>
</template>

<script>
import echartsBar from '@/components/cockpit/base/echarts-bar'
import {getSingleYield} from '@/api/cockpit/cockpit'

export default {
    name: 'singleYield',
    components: {echartsBar},
    methods: {
        getDataFun(){
            return getSingleYield
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