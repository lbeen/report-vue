<template>
    <kanban :conf="conf"></kanban>
</template>

<script>
import kanban from '@/components/kanban/kanban'
import {getBlankBarCount, getCutoffYield} from '@/api/kanban/machine'

export default {
    components: {
        kanban
    },
    data() {
        return {
            conf: [[{
                type: 'rollTable',
                width: 24,
                height: 12,
                title: '毛棒接收检验统计（kg）',
                dataFun: callback => getBlankBarCount(this.$route.query, callback)
            }], [{
                type: 'echarts',
                width: 24,
                height: 12,
                title: '切断产量统计（kg）',
                dataFun: callback => getCutoffYield(this.$route.query, callback)
            }]]
        }
    }
}
</script>

<style scoped>

</style>