<template>
    <iframe id="app" style="width:100%;border:0;overflow: hidden" :src="src" :height="height"></iframe>
</template>

<script>
import {getPageResources, getKanbanVersion} from '@/api/manage/kanban'
import {getServerTime} from '@/api/manage/sys'
import {getResourceLink} from '@/assets/kanban/js/kanban'

export default {
    data() {
        return {
            height: '',
            version: '',
            id: this.$route.query.id,
            src: '',

            lastTime: {},
            currentIndex: [0],

            main: {
                interval: 0,
                resources: []
            },
            timing: []
        }
    },
    created() {
        this.setIframeHeight()
        window.addEventListener("resize", this.setIframeHeight)

        getPageResources({id: this.id}, result => {
            const data = result.data

            this.main.interval = data.interval
            this.main.resources = data.resources
            this.timing = data.timing

            this.lastTime = data.time
            this.currentIndex = [0]
            this.setIframeSrc(this.main.resources[0])

            if (this.main.resources.length <= 1 && this.timing.length === 0) {
                return
            }

            setInterval(this.checkJump, 10000)
        })

        this.checkVersion()
    },
    methods: {
        setIframeHeight() {
            this.height = window.innerHeight - 4 + 'px'
        },
        checkVersion() {
            setInterval(() => {
                getKanbanVersion(this.id, result => {
                    if (!this.version) {
                        this.version = result.data
                        return
                    }
                    if (this.version !== result.data) {
                        window.location.reload()
                    }
                })
            }, 60000)
        },
        checkJump() {
            getServerTime(result => {
                const time = result.data

                for (let i = 0; i < this.timing.length; i++) {
                    const item = this.timing[i]
                    if (time.time >= item.startTime && time.time <= item.endTime) {
                        //当前是主资源或者不是当前时段资源跳转到当前时段第一个定时资源
                        if (this.currentIndex.length <= 1 || this.currentIndex[0] !== i) {
                            this.lastTime = time
                            this.currentIndex = [i, 0]
                            this.setIframeSrc(item.resources[0])
                            return
                        }
                        //当前时段定时资源只有一个
                        if (item.resources.length === 1) {
                            return
                        }

                        const resource = item.resources[this.currentIndex[1]]
                        this.loopResources(item.resources, time, resource.duration, 1)
                        return;
                    }
                }
                //当前是定时资源跳转到第一个主资源
                if (this.currentIndex.length > 1) {
                    this.lastTime = time
                    this.currentIndex = [0]
                    this.setIframeSrc(this.main.resources[0])
                    return
                }
                //只有一个主资源返回
                if (this.main.resources.length <= 1) {
                    return
                }
                this.loopResources(this.main.resources, time, this.main.interval, 0)
            })
        },
        loopResources(resources, time, interval, index) {
            //大于等于循环时间切换
            if (time.second - this.lastTime.second >= interval * 1000) {
                if (this.currentIndex[index] < resources.length - 1) {
                    this.currentIndex[index]++
                } else {
                    this.currentIndex[index] = 0
                }
                this.lastTime = time
                this.setIframeSrc(resources[this.currentIndex[index]])
            }
        },
        setIframeSrc(resource) {
            this.src = getResourceLink(resource.type, resource.location, resource.count, resource.duration)
        }
    }
}
</script>

<style scoped>

</style>