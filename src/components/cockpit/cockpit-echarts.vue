<template>
    <div :id="id" :style="{height: height}"></div>
</template>

<script>
const echarts = require("echarts")

export default {
    name: 'CockpitEcharts',
    props: {
        id: {
            type: String
        },
        height: {
            type: String
        },
        dataFun: {
            type: Function
        }
    },
    data() {
        return {
            echarts: ''
        }
    },
    mounted() {
        this.echarts = echarts.init(document.getElementById(this.id))
        this.initEcharts()
    },
    methods: {
        initEcharts() {
            this.dataFun(data => {
                    if (!data) {
                        return
                    }
                    const series = []
                    for (let i = 0, len = data.legends.length; i < len; i++) {
                        series.push({
                            name: data.legends[i],
                            type: 'line',
                            smooth: true,
                            symbol: 'roundRect',
                            data: data.yData[i]
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
                            data: data.legends,
                            show: true,
                            textStyle: {
                                color: "#999",
                                fontSize: 13
                            },
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: false,
                                data: data.xData,
                                splitLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#2d3b53'
                                    }
                                },
                                axisLabel: {
                                    textStyle: {
                                        color: "#fff"
                                    },
                                    alignWithLabel: true,
                                    interval: 0,
                                    rotate: '15'
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                splitLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#2d3b53'
                                    }
                                },
                                axisLabel: {
                                    textStyle: {
                                        color: "#999"
                                    }
                                },
                            }
                        ],
                        series: series
                    }
                    this.echarts.setOption(option);
                }
            )
        }
    }
}
</script>