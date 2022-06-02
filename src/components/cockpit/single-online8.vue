<template>
    <div :id="$options.name" :style="{height: height + 'px'}"></div>
</template>


<script>
import {getSingleOnline8} from '@/api/cockpit/cockpit'

const echarts = require('echarts')

export default {
    name: 'singleOnline8',
    data() {
        return {
            height: 0,
            echarts: ''
        }
    },
    methods: {
        init(width, height) {
            this.height = height
            this.$nextTick(() => {
                this.echarts = echarts.init(document.getElementById(this.$options.name))
                this.refresh()
            })
        },
        refresh() {
            getSingleOnline8(data => {
                const seriesData = []
                for (const key in data.series) {
                    seriesData.push({
                        name: key,
                        value: data.series[key]
                    })
                }
                const option = {
                    series: {
                        type: 'pie',
                        center: ['50%', '50%'],
                        data: seriesData,
                        label: {
                            show: true,
                            position: 'outside',
                            color: "#FFFFFF",
                            fontSize: 8,
                            align: "center",
                            baseline: "middle",
                            formatter(object) {
                                return object.value + '\n' + object.name
                            }
                        }
                    }
                }
                this.echarts.clear()
                this.echarts.setOption(option, true)
            })
        }
    }
}
</script>