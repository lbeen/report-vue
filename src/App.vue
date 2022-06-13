<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="scss">
// 默认 所有元素初始化 样式 无边距
* {
    margin: 0;
    padding: 0;
}

div, p {
    margin: 0;
    padding: 0;
}

body{
    overflow: hidden;
}
</style>
