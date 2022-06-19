import {ajaxGet} from '@/api/axios'

export function getBlankBarCount(param, callback) {
    ajaxGet('/kanban/machine/blankBarCount', param, callback)
}

export function getCutoffYield(param, callback) {
    ajaxGet('/kanban/machine/cutoffYield', param, callback)
}

export function getButtYield(param, callback) {
    ajaxGet('/kanban/machine/buttYield', param, callback)
}

export function getPolishingYield(param, callback) {
    ajaxGet('/kanban/machine/polishingYield', param, callback)
}

export function getFinishYield(param, callback) {
    ajaxGet('/kanban/machine/finishYield', param, callback)
}

export function getFinishLenDistribution(param, callback) {
    ajaxGet('/kanban/machine/finishLenDistribution', param, callback)
}