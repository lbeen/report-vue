import axios from 'axios'

const service = axios.create({
    baseURL: 'http://localhost:8090',
    // baseURL: 'http://10.2.0.147:8090',
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