export default {
    promptSuccess(msg){
        this.$message({
            message: msg,
            type: 'success',
            showClose: true
        })
    },
    promptError(msg){
        this.$message({
            message: msg,
            type: 'error',
            showClose: true
        })
    }
}