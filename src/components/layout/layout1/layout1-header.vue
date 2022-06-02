<template>
    <div class="header">
        <img class="img" src="@/assets/layout/layout1/img/logo.png" alt="" style="width: 90px"/>
        {{title}}
    </div>
</template>

<script>
export default {
    name: 'layout1Header',
    props: {
        title: {
            type: String,
            require:true
        }
    }
}
</script>