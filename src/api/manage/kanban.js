import {ajaxGet, ajaxGetWithCheck, ajaxPost} from '@/api/axios'

export function getResources(param, callback) {
    ajaxGetWithCheck('kanban/conf/getResources', param, callback)
}

export function getLocations(param, callback) {
    ajaxGetWithCheck('kanban/conf/getLocations', param, callback)
}

export function saveResource(param, callback) {
    ajaxPost('kanban/conf/saveResource', param, callback)
}

export function getPages(param, callback) {
    ajaxGetWithCheck('kanban/conf/getPages', param, callback)
}

export function savePage(param, callback) {
    ajaxPost('kanban/conf/savePage', param, callback)
}

export function loadKanbanVersion(param, callback) {
    ajaxPost('kanban/conf/loadKanbanVersion', param, callback)
}

export function getVideos(param, callback) {
    ajaxPost('kanban/conf/getVideos', param, callback)
}

export function getPageResources(param, callback) {
    ajaxPost('kanban/conf/getPageResources', param, callback)
}

export function getKanbanVersion(id, callback) {
    ajaxGet('kanban/conf/getKanbanVersion', {id: id}, result => {
        if (result && result.code === 0 && result.data) {
            callback(result.data)
        }
    })
}