<template>
    <div style="display: flex">
        <div v-for="(v, k) in data" v-bind:key="k" class="echarts-list-item">
            <dv-decoration9 :dur="4" :style="circularStyle">{{ v }}</dv-decoration9>
            <div class="echarts-name"><span :style="textStyle"> {{ k }} </span></div>
        </div>
    </div>
</template>

<script>
import {getFeedingAndFinish} from '@/api/cockpit/cockpit'

export default {
    name: 'feedingAndFinish',
    data() {
        return {
            width: 0,
            height: 0,
            data: {},
            circularStyle: {},
            textStyle: {}
        }
    },
    methods: {
        init(width, height) {
            this.width = width
            this.height = height
            this.refresh()
        },
        refresh() {
            getFeedingAndFinish(data => {
                if (Object.keys(data).length !== Object.keys(this.data).length) {
                    this.setStyle()
                }
                this.data = data
            })
        },
        setStyle() {
            const height = this.height - 10
            const width = (this.width - 50) / Object.keys(this.data).length
            if (height <= width) {
                this.circularStyle = {
                    'width': height + 'px',
                    'height': height + 'px',
                    'color': '#ffffff',
                    'display': 'inline-flex',
                    'font-size': '12px',
                }
                this.textStyle = {
                    marginTop: '5px',
                    color: '#ffffff'
                }
            } else {
                this.circularStyle = {
                    'width': width + 'px',
                    'height': width + 'px',
                    'color': '#ffffff',
                    'display': 'inline-flex'
                }
                this.textStyle = {
                    marginTop: (this.height - width - 21) * 2 / 3 + 'px',
                    color: '#ffffff'
                }
            }
        }
    }
}
</script>

<style scoped>
.echarts-list-item {
    width: 25%;
    text-align: center;
}

.echarts-name {
    font-size: 10px;
    display: flex;
    justify-content: center;
}
</style>