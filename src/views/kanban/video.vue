<template>
    <video id="video" class="video-js vjs-default-skin vjs-big-play-centered vjs-16-9" controls preload="auto"
           autoplay="autoplay" webkit-playsinline="true" playsinline="true" type="application/x-mpegURL"
           allowsInlineMediaPlayback="YES" webview.allowsInlineMediaPlayback="YES" width='100%'
           x5-video-player-fullscreen="true"></video>
</template>

<script>
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import {getVideos} from '@/api/manage/kanban'

export default {
    created() {
        const location = this.$route.query.location
        getVideos({location}, result => {
            console.log(result)
            const video = Video('video');

            const sources = result.data;
            if (!sources || sources.length === 0) {
                return
            }
            for (let i = 0; i < sources.length; i++) {
                sources[i] = 'http://10.2.6.166:8090/kanban/video/' + location + '/' + sources[i]
                // sources[i] = '/kanban/video/' + location + '/' + sources[i]
            }
            let current = 0
            video.src(sources[current])
            video.on('ended', function () {
                if (current < sources.length - 1) {
                    current++
                } else {
                    current = 0
                }
                video.src(sources[current])
            })
        })
    }
}
</script>