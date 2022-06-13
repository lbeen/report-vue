<template>
    <div :id="id" :style="{height: height + 'px'}"></div>
</template>

<script>
import {getLifetimeGt150} from '@/api/cockpit/cockpit'

const echarts = require('echarts')

export default {
    name: 'lifetimeGt150',
    data() {
        return {
            id: Math.random().toString(36),
            height: 0,
            echarts: ''
        }
    },
    methods: {
        init(width, height) {
            this.height = height
            this.$nextTick(() => {
                this.echarts = echarts.init(document.getElementById(this.id))
                this.refresh()
            })
        },
        refresh() {
            getLifetimeGt150(data => {
                const option = {
                    grid: {
                        left: '3%',
                        right: '3%',
                        bottom: '3%',
                        top: '10%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: data.xAxis,
                        boundaryGap: false,
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#2d3b53'
                            }
                        },
                        axisLabel: {
                            color: '#FFFFFF',
                            fontSize: 8,
                            rotate: '15'
                        }
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#2d3b53'
                            }
                        },
                        axisLabel: {
                            fontSize: 8,
                            color: '#999'
                        }
                    },
                    series: {
                        data: data.yAxis,
                        type: 'line',
                        areaStyle: {},
                        label: {
                            show: true,
                            color: '#FFFFFF',
                            fontSize: 8
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