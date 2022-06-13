<template>
    <div class="circular-list" :style="{height: height + 'px'}">
        <div v-for="(v, k) in items" v-bind:key="k" class="circular-item" :style="v.circularStyle">
            <dv-digital-flop :config="v.flopConfig"/>
        </div>
    </div>
</template>

<script>
import {getUnitConsumption} from '@/api/cockpit/cockpit'

export default {
    name: 'UnitConsumption',
    data() {
        return {
            height: 0,
            items: []
        }
    },
    methods: {
        init(width, height) {
            this.height = height
            width -= 60
            height -= 10
            let maxWidth = width * 0.45
            if (maxWidth > height) {
                maxWidth = height
            }

            this.initCircular('新鲜水', maxWidth / 1.2, '#0bdd87')
            this.initCircular('电', maxWidth, '#578AF1')
            this.initCircular('氩气', maxWidth / 1.5, '#E6A23C')
            this.refresh()
        },
        initCircular(name, radius, color) {
            this.items.push({
                circularStyle: {
                    width: radius + 'px',
                    height: radius + 'px',
                    backgroundColor: color
                },
                flopConfig: {
                    number: [0],
                    style: {
                        fontSize: 14,
                        fill: '#FFFFFF'
                    },
                    formatter() {
                        return name + '\n--'
                    }
                }
            })
        },
        refresh() {
            getUnitConsumption(data => {
                // this.refreshCircular(0, data, '新鲜水', 't/kg')
                this.refreshCircular(1, data, '电', 'kWh/kg')
                // this.refreshCircular(2, data, '氩气', 'kWh/kg')
            })
        },
        refreshCircular(index, data, name, unit) {
            this.items[index].flopConfig = {
                number: [data[name]],
                content: name + '\n{nt}\n' + unit,
                toFixed: 2,
                style: {
                    fontSize: 14,
                    fill: '#FFFFFF'
                }
            }
        }
    }
}
</script>
<style scoped>
.circular-list {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px 5px 5px;
}


.circular-list .circular-item {
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #ffffff;
}

.circular-list .circular-item:not(:first-child) {
    margin-left: 15px;
}
</style>