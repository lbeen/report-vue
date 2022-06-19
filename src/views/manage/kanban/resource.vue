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
                        <el-form-item label="资源名称">
                            <el-input v-model="queryParam.name" size="small" clearable placeholder="资源名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="资源类型">
                            <el-select v-model="queryParam.type" size="small" clearable placeholder="资源类型">
                                <el-option v-for="item in types" :key="item" :value="item" :label="item"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" style="padding-top: 5px">
                        <el-button size="small" @click="query">查询</el-button>
                        <el-button type="primary" @click="openEdit('')" size="small">新增</el-button>
                    </el-col>
                </el-form>
            </el-row>
            <el-row>
                <el-table :data="list" stripe :max-height="tableMaxHeight">
                    <el-table-column label="序号" type="index" width="50px"></el-table-column>
                    <el-table-column label="工厂" align="center" width="50px">
                        <template v-slot="scope">{{factories[scope.row.factory]}}</template>
                    </el-table-column>
                    <el-table-column label="名称" align="center" width="200px">
                        <template v-slot="scope">
                            <el-link type="primary" target="_blank"
                                     :href="getResourceLink(scope.row.type, scope.row.location, scope.row.count, scope.row.duration)">
                                {{ scope.row.name }}
                            </el-link>
                        </template>
                    </el-table-column>
                    <el-table-column label="类型" prop="type" align="center" width="100px"></el-table-column>
                    <el-table-column label="位置" prop="location" align="center"></el-table-column>
                    <el-table-column label="数量" prop="count" align="center" width="100px"></el-table-column>
                    <el-table-column label="时长" prop="duration" align="center" width="100px"></el-table-column>
                    <el-table-column label="操作" align="center" width="100px">
                        <template v-slot="scope">
                            <el-button type="primary" size="small" @click="openEdit(scope.row)">编 辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </el-row>
        <el-dialog :title="editTitle" :visible.sync="isShowEdit" :close-on-click-modal="false" width="600px">
            <el-form label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="工厂">
                            <el-select v-model="editData.factory" size="small" clearable placeholder="工厂">
                                <el-option v-for="(v, k) in factories" :key="k" :value="k" :label="v"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="资源名称">
                            <el-input v-model="editData.name" size="small" placeholder="资源名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="资源类型">
                            <el-select v-model="editData.type" size="small" clearable placeholder="资源类型"
                                       @change="editTypeChange">
                                <el-option v-for="item in types" :key="item" :value="item" :label="item"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="editData.type === 'HTML'" :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="资源位置">
                            <el-input type="textarea" v-model="editData.location" size="small"
                                      placeholder="内部链接或是外部链接"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-else-if="editData.type === 'PPT' || editData.type === 'VIDEO'" :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="资源位置">
                            <el-select v-model="editData.location" size="small" placeholder="视频或PPT目录">
                                <el-option v-for="item in locations" :key="item" :value="item"
                                           :label="item"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="资源数量">
                            <el-input-number v-model="editData.count" size="small" :min="0" :step="1"
                                             :step-strictly="true"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="资源时长">
                            <el-input-number v-model="editData.duration" size="small" :min="0" :step="1"
                                             :step-strictly="true"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="isShowEdit = false">取 消</el-button>
            <el-button type="primary" size="small" @click="save">保 存</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import {getResources, getLocations, saveResource} from '@/api/manage/kanban'
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
                type: '',
                name: '',
                location: '',
                count: '',
                duration: ''
            },

            types: ['HTML', 'PPT', 'VIDEO'],
            factories: {
                'BS': '保山',
                'TC': '腾冲'
            },
            locations: []
        }
    },
    created() {
        this.setTableMaxHeight()
        window.addEventListener("resize", this.setTableMaxHeight)

        this.query()
    },
    methods: {
        setTableMaxHeight() {
            this.tableMaxHeight = window.innerHeight - 100
        },
        query() {
            getResources(this.queryParam, result => this.list = result.data)
        },
        getResourceLink(type, location, count, duration) {
            return getResourceLink(type, location, count, duration)
        },
        openEdit(item) {
            if (item) {
                this.editTypeChange(item.type)
                this.editTitle = '修改'
                this.editData = {
                    id: item.id,
                    factory: item.factory,
                    type: item.type,
                    name: item.name,
                    location: item.location,
                    count: item.count,
                    duration: item.duration
                }
            } else {
                this.editTitle = '新增'
                this.editData = {
                    id: '',
                    factory: '',
                    type: '',
                    name: '',
                    location: '',
                    count: '',
                    duration: ''
                }
            }
            this.isShowEdit = true
        },
        editTypeChange(value) {
            this.editData.location = ''
            if (value !== 'HTML') {
                getLocations({type: value}, result => this.locations = result.data)
            }
        },
        save() {
            if (!this.editData.factory) {
                this.$message.error('工厂不能为空')
                return
            }
            if (!this.editData.type) {
                this.$message.error('资源类型不能为空')
                return
            }
            if (!this.editData.name) {
                this.$message.error('资源名称不能为空')
                return
            }
            if (this.editData.type === 'VIDEO') {
                if (!this.editData.location || this.editData.location.length < 0) {
                    this.$message.error('资源位置为必填项')
                    return
                }
            } else if (!this.editData.location) {
                this.$message.error('资源位置不能为空')
                return
            }
            if (!this.editData.count) {
                this.$message.error('资源数量不能为空')
                return
            }
            if (this.editData.type !== 'HTML' && !this.editData.duration) {
                this.$message.error('资源时长不能为空')
                return
            }
            saveResource('/kanban/conf/saveResource', {
                id: this.editData.id,
                factory: this.editData.factory,
                type: this.editData.type,
                name: this.editData.name,
                location: this.editData.location,
                count: this.editData.count,
                duration: this.editData.duration,
            }, () => {
                this.query()
                this.isShowEdit = false
            })
        }
    }
}
</script>