import {ajaxGet} from '@/api/axios'

export function getKanbanVersion(id, callback) {
    ajaxGet('kanban/conf/getKanbanVersion', {id: id}, result => {
        if (result && result.code === 0 && result.data) {
            callback(result.data)
        }
    })
}