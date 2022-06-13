import axios from 'axios'
import {ajaxGet} from '@/api/axios'

export function getLifetimeGt150(callback) {
    ajaxGet('cockpit/lifetimeGt150', null, callback)
}

export function getBreakLine(callback) {
    ajaxGet('cockpit/breakLine', null, callback)
}

export function getUnitConsumption(callback) {
    axios.post('http://10.0.2.52:18032/EMStoMES').then(response => {
        if (response.data && response.data.data) {
            let data = {}
            for (const item of response.data.data) {
                const variableName = item.variableName;
                data[variableName.substring(variableName.indexOf('-') + 1).replace('单耗', '')] = item.modifiedValue
            }
            callback(data)
        }
    })
}

export function getSingleYield(callback) {
    ajaxGet('cockpit/singleYield', null, callback)
}

export function getMachineYield(callback) {
    ajaxGet('cockpit/machineYield', null, callback)
}

export function getFeedingAndFinish(callback) {
    ajaxGet('cockpit/feedingAndFinish', null, callback)
}

export function getSquareSingleYield(callback) {
    ajaxGet('cockpit/squareSingleYield', null, callback)
}

export function getTurnoverDays(callback) {
    ajaxGet('cockpit/turnoverDays', null, callback)
}

export function getMachineOnline48(callback) {
    ajaxGet('cockpit/machineOnline48', null, callback)
}

export function getSingleOnline8(callback) {
    ajaxGet('cockpit/singleOnline8', null, callback)
}