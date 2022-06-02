<template>
    <div class="circular-list" :style="{height: height + 'px'}">
        <div v-for="item in list" v-bind:key="item.name" class="circular-item" :style="item.style">
            <span class="circular-number">{{ item.numberCount }}</span>
            <span class="circular-name">{{ item.name }}</span>
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
            list: []
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

            this.list = [{
                name: '新鲜水',
                numberCount: 0,
                style: {
                    width: maxWidth / 1.5 + 'px',
                    height: maxWidth / 1.5 + 'px',
                    backgroundColor: '#0bdd87'
                },
            }, {
                name: '氩气',
                numberCount: 0,
                style: {
                    width: maxWidth + 'px',
                    height: maxWidth + 'px',
                    backgroundColor: '#578AF1'
                },
            }, {
                name: '电',
                numberCount: 0,
                style: {
                    width: maxWidth / 1.8 + 'px',
                    height: maxWidth / 1.8 + 'px',
                    backgroundColor: '#E6A23C'
                },
            }]
            this.refresh()
        },
        refresh() {
            getUnitConsumption(data => {
                for (const item of this.list) {
                    item.numberCount = data[item.name] ? data[item.name].toFixed(2) : 0
                }
            })
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

.circular-number {
    font-size: 1.0rem;
}

.circular-name {
    font-size: 0.6rem;
}
</style>