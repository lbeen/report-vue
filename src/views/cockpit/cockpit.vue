<template>
    <layout1 title="保山隆基拉晶产线驾驶舱" :interval="10000">
        <layout1-column width="28">
            <layout1-container title="B面寿命>150占比（%）" height="35">
                <lifetimeGt150/>
            </layout1-container>
            <layout1-container title="断线率" height="35">
                <break-line/>
            </layout1-container>
            <layout1-container title="能管单耗" height="30">
                <unit-consumption/>
            </layout1-container>
        </layout1-column>
        <layout1-column width="44">
            <layout1-container height="25">
                <feeding-and-finish/>
            </layout1-container>
            <layout1-container title="方棒单产" height="40">
                <square-single-yield/>
            </layout1-container>
            <layout1-container height="35" split>
                <layout1-container-li title="切方产能">
                    <buttYield/>
                </layout1-container-li>
                <layout1-container-li title="抛光产能">
                    <polishing-yield/>
                </layout1-container-li>
            </layout1-container>
        </layout1-column>
        <layout1-column width="28">
            <layout1-container title="机加物料在线周转天数" height="35">
                <turnover-days/>
            </layout1-container>
            <layout1-container title="机加48小时在线" height="35">
                <machine-online48/>
            </layout1-container>
            <layout1-container title="单晶8小时在线" height="30">
                <single-online8/>
            </layout1-container>
        </layout1-column>
    </layout1>
</template>

<script>
import layout1 from '@/components/layout/layout1/layout1'
import layout1Column from '@/components/layout/layout1/layout1-column'
import layout1Container from '@/components/layout/layout1/layout1-container'
import layout1ContainerLi from '@/components/layout/layout1/layout1-container-li'
import squareSingleYield from '@/components/cockpit/square-single-yield'
import turnoverDays from '@/components/cockpit/turnover-days'
import feedingAndFinish from '@/components/cockpit/feeding-and-finish'
import lifetimeGt150 from '@/components/cockpit/lifetime-gt150'
import machineOnline48 from '@/components/cockpit/machine-online48'
import singleOnline8 from '@/components/cockpit/single-online8'
import breakLine from '@/components/cockpit/break-line'
import unitConsumption from '@/components/cockpit/unit-consumption'
import buttYield from '@/components/cockpit/butt-yield'
import polishingYield from '@/components/cockpit/polishing-yield'

import {getKanbanVersion} from '@/api/kanban/kanbanConfig'

export default {
    components: {
        layout1,
        layout1Column,
        layout1Container,
        layout1ContainerLi,
        squareSingleYield,
        turnoverDays,
        feedingAndFinish,
        lifetimeGt150,
        machineOnline48,
        breakLine,
        singleOnline8,
        unitConsumption,
        buttYield,
        polishingYield
    },
    data() {
        return {
            version: ''
        }
    },
    created() {
        setInterval(() => {
            getKanbanVersion('0cfb89e29ddc4744bf7a89324bb3e9ef', version => {
                if (!this.version) {
                    this.version = version
                    return
                }
                if (this.version !== version) {
                    window.location.reload()
                }
            })
        }, 10000)
    }
}
</script>
