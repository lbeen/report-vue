<template>
    <div :id="id" :style="{height: height + 'px'}"></div>
</template>

<script>
const echarts = require("echarts")

export default {
    name: 'echartsStackHorizontal',
    props: {
        dataFun: {
            type: Function,
            require: true
        }
    },
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
            this.dataFun(data => {
                const series = []
                for (let i = 0; i < data.legend.length; i++) {
                    series.push({
                        name: data.legend[i],
                        stack: 'online',
                        type: "bar",
                        data: data.yAxis[i],
                        label: {
                            show: true,
                            color: "#FFFFFF",
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
                        itemWidth: 10,
                        itemHeight: 8,
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
                        axisLabel: {
                            fontSize: 8,
                            color: '#999',
                            rotate: '15'
                        }
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
                            fontSize: 8,
                        }
                    }],
                    series: series
                }
                this.echarts.clear()
                this.echarts.setOption(option, true)
            })
        }
    }
}
</script>