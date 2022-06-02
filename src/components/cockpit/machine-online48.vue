<template>
    <div :id="$options.name" :style="{height: height + 'px'}"></div>
</template>

<script>
import {getMachineOnline48} from '@/api/cockpit/cockpit'

const echarts = require("echarts")

export default {
    name: 'machineOnline48',
    props: {},
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
            getMachineOnline48(data => {
                    const series = []
                    for (let i = 0, len = data.legend.length; i < len; i++) {
                        series.push({
                            name: data.legend[i],
                            stack: 'online',
                            type: "bar",
                            data: data.yAxis[i],
                            label: {
                                show: true,
                                fontSize: 8,
                                formatter(params) {
                                    return params.value ? params.value : ''
                                }
                            }
                        })
                    }
                    const option = {
                        grid: {
                            left: '3%',
                            right: '3%',
                            bottom: '3%',
                            top: "20%",
                            containLabel: true
                        },
                        legend: {
                            data: data.legend,
                            show: true,
                            itemWidth:8,
                            itemHeight:8,
                            textStyle: {
                                color: "#FFFFFF",
                                fontSize: 8
                            }
                        },
                        xAxis: {
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#2D3B53'
                                }
                            },
                            textStyle: {
                                color: "#FFFFFF",
                                fontSize: 8
                            },
                        },
                        yAxis: [{
                            data: data.xAxis,
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#2D3B53'
                                }
                            },
                            axisLabel: {
                                color: '#FFFFFF',
                                fontSize: 8
                            }
                        }],
                        series: series
                    }
                    this.echarts.clear()
                    this.echarts.setOption(option, true)
                }
            )
        }
    }
}
</script>