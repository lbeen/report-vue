<template>
    <div>
        <el-row style="padding: 10px">
            <el-row :gutter="20">
                <el-form label-width="80px">
                    <el-col :span="5">
                        <el-form-item label="工厂">
                            <el-select v-model="queryParam.factory" size="small" clearable placeholder="工厂">
                                <el-option v-for="(v, k) in factories" :key="k" :value="k" :label="v"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="页面名称">
                            <el-input v-model="queryParam.name" size="small" clearable placeholder="资源名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" style="padding-top: 5px">
                        <el-button size="small" @click="query">查询</el-button>
                        <el-button type="primary" @click="openEdit('')" size="small">新增</el-button>
                        <el-button type="danger" size="small" @click="refreshAllVersion" title="所有现场看板重新加载">
                            全部刷新看板版本
                        </el-button>
                    </el-col>
                </el-form>
            </el-row>
            <el-row>
                <el-table :data="list" stripe :max-height="tableMaxHeight">
                    <el-table-column label="序号" type="index" width="50px"></el-table-column>
                    <el-table-column label="工厂" align="center" width="50px">
                        <template v-slot="scope">{{ factories[scope.row.factory] }}</template>
                    </el-table-column>
                    <el-table-column label="名称" align="center" width="200px">
                        <template v-slot="scope">
                            <el-link type="primary" :href="getPageLink(scope.row.id)" target="_blank">
                                {{ scope.row.name }}
                            </el-link>
                        </template>
                    </el-table-column>
                    <el-table-column label="资源" align="center" width="200px">
                        <template v-slot="scope">
                            <el-link v-for="item in scope.row.resources" type="primary" :href="getResourceLink(item)"
                                     target="_blank" :key="item">
                                [{{ getResourceName(item) }}]
                            </el-link>
                        </template>
                    </el-table-column>
                    <el-table-column label="循环间隔" prop="interval" align="center" width="100px"></el-table-column>
                    <el-table-column label="定时配置" align="center">
                        <template v-slot="scope">
                            <div v-for="(item, i) in scope.row.timing" :key="scope.row.id + 'timing' + i">
                                {{ item.startTime }}-{{ item.endTime }}:
                                <el-link v-for="(resource, j) in item.resources" type="primary"
                                         :key="scope.row.id + 'timing' + i + 'resource' + j"
                                         :href="getResourceLink(resource)" target="_blank">
                                    [{{ getResourceName(resource) }}]
                                </el-link>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="100px">
                        <template v-slot="scope">
                            <el-button type="primary" size="small" @click="openEdit(scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </el-row>
        <el-dialog :title="editTitle" :visible.sync="isShowEdit" :close-on-click-modal="false" width="800px">
            <el-form label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="工厂">
                            <el-select v-model="editData.factory" size="small" clearable placeholder="工厂"
                                       @change="editFactoryChange">
                                <el-option v-for="(v, k) in factories" :key="k" :value="k" :label="v"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="版本">
                            <el-input v-model="editData.version" size="small" placeholder="版本"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="页面名称">
                            <el-input v-model="editData.name" size="small" placeholder="页面名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="页面资源">
                            <el-select v-model="editData.resources" size="small" multiple filterable placeholder="页面资源">
                                <el-option v-for="item in filterResources" :key="item.id" :value="item.id"
                                           :label="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="循环间隔">
                            <el-input-number v-model="editData.interval" size="small" :min="0" :step="10"
                                             :step-strictly="true"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="padding-top: 5px">
                        <el-button type="primary" size="small" @click="addTiming">新增定时配置</el-button>
                    </el-col>
                </el-row>
                <el-table :data="editData.timing" stripe>
                    <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
                    <el-table-column label="开始时间" align="center" width="140px">
                        <template v-slot="scope">
                            <el-time-select v-model="editData.timing[scope.$index].startTime" size="small"
                                            :picker-options="timeSelectOption" placeholder="开始时间" style="width: 120px">
                            </el-time-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="结束时间" align="center" width="140px">
                        <template v-slot="scope">
                            <el-time-select v-model="editData.timing[scope.$index].endTime" size="small"
                                            :picker-options="timeSelectOption" placeholder="结束时间" style="width: 120px">
                            </el-time-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="资源" align="center">
                        <template v-slot="scope">
                            <el-select v-model="editData.timing[scope.$index].resources" size="small" multiple
                                       placeholder="请选择资源" style="width: 300px">
                                <el-option v-for="item in resources" :key="item.id" :value="item.id"
                                           :label="item.name"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="50px">
                        <template v-slot="scope">
                            <i class="el-icon-delete" style="color: red;cursor: pointer"
                               @click="deleteTiming(scope.$index)"></i>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="isShowEdit = false">取 消</el-button>
            <el-button type="primary" size="small" @click="save">保 存</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import {getPages, getResources, loadKanbanVersion, savePage} from '@/api/manage/kanban'
import {getResourceLink} from '@/assets/kanban/js/kanban'

export default {
    data() {
        return {
            tableMaxHeight: 500,

            list: [],
            queryParam: {
                factory: '',
                name: '',
                type: ''
            },
            isShowEdit: false,
            editTitle: '',
            editData: {
                id: '',
                factory: '',
                version: '1.0',
                name: '',
                resources: [],
                interval: 0,
                timing: []
            },

            resources: [],
            filterResources: [],
            factories: {
                'BS': '保山',
                'TC': '腾冲'
            },
            timeSelectOption: {
                start: '00:00',
                step: '00:05',
                end: '23:50'
            }
        }
    },
    created() {
        this.setTableMaxHeight()
        window.addEventListener("resize", this.setTableMaxHeight)

        getResources({}, result => this.resources = result.data);
        this.query()
    },
    methods: {
        setTableMaxHeight() {
            this.tableMaxHeight = window.innerHeight - 100
        },
        query() {
            getPages(this.queryParam, result => {
                const list = result.data
                for (let i = 0; i < list.length; i++) {
                    list[i].resources = JSON.parse(list[i].resources)
                    list[i].timing = JSON.parse(list[i].timing)
                }
                this.list = list
            })
        },
        getPageLink(id) {
            return '/#/kanban?id=' + id
        },
        getResourceLink(id) {
            const resource = this.getResource(id)
            if (!resource) {
                return ''
            }
            return getResourceLink(resource.type, resource.location, resource.count, resource.duration)
        },
        getResourceName(id) {
            const resource = this.getResource(id)
            return resource ? resource.name : ''
        },
        getResource(id) {
            for (let i = 0; i < this.resources.length; i++) {
                const resource = this.resources[i]
                if (resource.id === id) {
                    return resource
                }
            }
        },
        openEdit(item) {
            if (item) {
                this.editFactoryChange(item.factory)
                this.editTitle = '修改'
                this.editData = {
                    id: item.id,
                    factory: item.factory,
                    version: item.version,
                    name: item.name,
                    resources: item.resources,
                    interval: item.interval,
                    timing: item.timing
                }
            } else {
                this.editTitle = '新增'
                this.editData = {
                    id: '',
                    factory: '',
                    version: '1.0',
                    name: '',
                    resources: [],
                    interval: 0,
                    timing: []
                }
            }
            this.isShowEdit = true
        },
        editFactoryChange(value) {
            this.filterResources = []
            if (!value) {
                return
            }
            for (let i = 0; i < this.resources.length; i++) {
                if (this.resources[i].factory === value) {
                    this.filterResources.push(this.resources[i])
                }
            }
        },
        addTiming() {
            this.editData.timing.push({})
        },
        deleteTiming(index) {
            const timing = []
            for (let i = 0; i < this.editData.timing.length; i++) {
                if (index === i) {
                    continue
                }
                timing.push(this.editData.timing[i])
            }
            this.editData.timing = timing
        },
        save() {
            if (!this.editData.factory) {
                this.$message.error('工厂不能为空')
                return
            }
            if (!this.editData.version) {
                this.$message.error('版本不能为空')
                return
            }
            if (!this.editData.name) {
                this.$message.error('页面名称不能为空')
                return
            }
            if (this.editData.resources.length === 0) {
                this.$message.error('请选择资源')
                return;
            }
            if (this.editData.resources.length > 1 && this.editData.interval === 0) {
                this.$message.error('循环间隔为必填项')
                return;
            }
            for (let i = 0; i < this.editData.timing.length; i++) {
                if (!this.editData.timing[i].name) {
                    this.$message.error('开始时间不能为空')
                    return
                }
                if (!this.editData.timing[i].name) {
                    this.$message.error('结束时间不能为空')
                    return
                }
                if (!this.editData.timing[i].resources) {
                    this.$message.error('资源不能为空')
                    return
                }
            }
            const param = {
                id: this.editData.id,
                factory: this.editData.factory,
                version: this.editData.version,
                name: this.editData.name,
                resources: JSON.stringify(this.editData.resources),
                interval: this.editData.interval,
                timing: JSON.stringify(this.editData.timing)
            }
            savePage(param, () => {
                this.query()
                this.isShowEdit = false
            })
        },
        refreshAllVersion() {
            loadKanbanVersion()
        }
    }
}
</script>