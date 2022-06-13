<template>
    <div :id="id" :style="{height: height + 'px'}"></div>
</template>

<script>
const echarts = require('echarts')

export default {
    name: 'echartsBar',
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
                for (let i = 0, len = data.legend.length; i < len; i++) {
                    series.push({
                        name: data.legend[i],
                        type: 'bar',
                        data: data.yAxis[i],
                        label: {
                            show: true,
                            color: '#FFFFFF',
                            fontSize: 8,
                            position: 'top',
                            formatter(params) {
                                if (params.value) {
                                    return params.value
                                }
                                return ''
                            }
                        }
                    })
                }
                const option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        left: '3%',
                        right: '3%',
                        bottom: '3%',
                        top: "10%",
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
                    xAxis: [{
                        type: 'category',
                        data: data.xAxis,
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#2D3B53'
                            }
                        },
                        axisLabel: {
                            fontSize: 8,
                            color: "#FFFFFF"
                        }
                    }],
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#2D3B53'
                            }
                        },
                        axisLabel: {
                            fontSize: 8,
                            color: "#999999"
                        }
                    },
                    series: series
                }
                this.echarts.clear()
                this.echarts.setOption(option, true)
            })
        }
    }
}
</script>