<template>
    <div style="display: flex">
        <div v-for="(v, k) in data" v-bind:key="k" class="item">
            <dv-decoration9 :dur="4" :style="{width: circularWidth + 'px',height: circularHeight + 'px'}"
                            class="item-circular">
                <dv-digital-flop :config="v" :style="{height: circularHeight - 10 + 'px'}"/>
            </dv-decoration9>
            <div class="item-name"><span :style="{marginTop: nameMarginTop + 'px'}"> {{ k }} </span></div>
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
            circularWidth: 0,
            circularHeight: 0,
            nameMarginTop: 0,
            data: {}
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
                const keys = Object.keys(data)
                const oldKeys = Object.keys(this.data)
                if (keys.length !== oldKeys.length) {
                    this.initData(data)
                    return
                }
                for (let i = 0; i < keys.length; i++) {
                    if (keys[i] !== oldKeys[i]) {
                        this.initData(data)
                        return
                    }
                }
                this.refreshData(data)
            })
        },
        initData(data) {
            const height = this.height - 10
            const width = (this.width - 50) / Object.keys(data).length
            if (height <= width) {
                this.circularWidth = height
                this.circularHeight = height
                this.nameMarginTop = 5
            } else {
                this.circularWidth = width
                this.circularHeight = width
                this.nameMarginTop = (this.height - width - 21) * 2 / 3
            }

            const newData = {}
            for (const key in data) {
                newData[key] = this.getFlopConf(data[key])
            }
            this.data = newData
        },
        refreshData(data) {
            for (const key in this.data) {
                this.data[key] = this.getFlopConf(data[key])
            }
        },
        getFlopConf(value) {
            return {
                number: [value],
                toFixed: 2,
                style: {
                    fontSize: 12,
                    fill: '#FFFFFF'
                }
            }
        }
    }
}
</script>

<style scoped>
.item {
    width: 25%;
    text-align: center;
}

.item-circular {
    display: inline-flex;
}

.item-name {
    font-size: 10px;
    display: flex;
    justify-content: center;
    color: #FFFFFF;
}
</style>