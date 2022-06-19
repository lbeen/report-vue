<template>
    <kanban :conf="conf"></kanban>
</template>

<script>
import kanban from '@/components/kanban/kanban'
import {getButtYield, getPolishingYield} from '@/api/kanban/machine'

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
                title: '切方产量统计（kg）',
                dataFun: callback => getButtYield(this.$route.query, callback)
            }], [{
                type: 'echarts',
                width: 24,
                height: 12,
                title: '抛光产量统计（kg）',
                dataFun: callback => getPolishingYield(this.$route.query, callback)
            }]]
        }
    }
}
</script>

<style scoped>

</style>