<template>
    <kanban :conf="conf"></kanban>
</template>

<script>
import kanban from '@/components/kanban/kanban'
import {getFinishYield, getFinishLenDistribution} from '@/api/kanban/machine'

export default {
    components: {
        kanban
    },
    data() {
        return {
            conf: [[{
                type: 'echarts',
                width: 24,
                height: 12,
                title: '成品产量统计（kg）',
                dataFun:callback => getFinishYield(this.$route.query, callback),
            }], [{
                type: 'rollTable',
                width: 24,
                height: 12,
                title: '未包装方棒数量（kg）',
                dataFun:callback => getFinishLenDistribution(this.$route.query, callback),
                fixTail: true
            }]]
        }
    }
}
</script>

<style scoped>

</style>