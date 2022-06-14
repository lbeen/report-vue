import { ajaxGetWithCheck, ajaxPost} from '@/api/axios'

export function getResources(param, callback) {
    ajaxGetWithCheck('kanban/conf/getResources', param, callback)
}
export function getLocations(param, callback) {
    ajaxGetWithCheck('kanban/conf/getLocations', param, callback)
}
export function saveResource(param, callback) {
    ajaxPost('kanban/conf/saveResource', param, callback)
}