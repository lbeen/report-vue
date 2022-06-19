import {ajaxGetWithCheck} from '@/api/axios'

export function getServerTime(callback) {
    ajaxGetWithCheck('sys/getServerTime', null, callback)
}