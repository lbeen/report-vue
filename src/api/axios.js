import vue from '@/main'
import axios from 'axios'

const service = axios.create({
    // baseURL: 'http://10.2.0.147:8090',
    baseURL: 'http://localhost:8090',
    timeout: 250000
})

/**
 * GET获取数据
 */
export function ajaxGet(url, params, callback) {
    service.request({
        url: url,
        method: 'get',
        params: params
    }).then(response => {
        if (response.data) {
            callback(response.data)
        }
    })
}

/**
 * GET获取数据
 */
export function ajaxGetWithCheck(url, params, success, error) {
    service.request({
        url: url,
        method: 'get',
        params: params
    }).then(response => checkResponse(response, success, error))
}

/**
 * post提交数据
 */
export function ajaxPost(url, params, success, error) {
    service.request({
        url: url,
        method: 'post',
        params: params
    }).then(response => checkResponse(response, success, error))
}

function checkResponse(response, success, error){
    const result = response.data
    if (!result) {
        return
    }
    if (result.code === 0) {
        if (success) {
            success(result)
        }
        if (result.msg) {
            vue.$message.success(result.msg)
        }
    } else {
        if (error) {
            error(result)
        }
        if (result) {
            vue.$message.error(result.msg)
        }
    }
}