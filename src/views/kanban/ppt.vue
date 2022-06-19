<template>
    <el-carousel ref="carousel" :interval="eachDuration" indicator-position="none" arrow="never"
                 :height="carouselHeight"
                 @mouseenter.native="delHandleMouseEnter">
        <el-carousel-item v-for="item in count" :key="item">
            <img :src="getImgUrl(item)" style="height: 100%;width: 100%" alt="">
        </el-carousel-item>
    </el-carousel>
</template>

<script>
export default {
    data() {
        return {
            carouselHeight: '',
            location: '',
            count: 0,
            eachDuration: -1
        }
    },
    created() {
        console.log("PPT")
        this.setCarouselHeight()
        window.addEventListener("resize", this.setCarouselHeight)

        const query = this.$route.query;
        this.location = query.location
        this.count = query.count
        this.eachDuration = query.eachDuration
    },
    mounted() {
        this.delHandleMouseEnter()
    },
    methods: {
        setCarouselHeight() {
            this.carouselHeight = window.innerHeight - 20 + 'px'
        },
        getImgUrl(index) {
            return 'http://10.2.6.166:8090/kanban/ppt/' + this.location + '/' + index + '.JPG'
            // return '/kanban/ppt/' + this.location + '/' + index + '.JPG'
        },
        delHandleMouseEnter() {
            this.$refs.carousel.handleMouseEnter = () => {}
        }
    }
}
</script>