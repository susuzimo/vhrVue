<template>
    <div>
        <div>
            <el-input
                class="addPosInput"
                placeholder="添加职位"
                size="small"
                prefix-icon="el-icon-plus"
                v-model="pos.name">
            </el-input>
            <el-button size="small" icon="el-icon-plus" type="primary" @click="addPositions">
                新增
            </el-button>
        </div>
        <div class="PosManaMain">
            <el-table
                :data="positions"
                border
                stripe
                @selection-change="handleSelectionChange"
                style="width: 70%">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                prop="id"
                label="编号"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="职位名称"
                width="180">
                </el-table-column>
                <el-table-column
                prop="createDate"
                label="创建时间">
                </el-table-column>
                  <el-table-column
                label="是否启用">
                <template slot-scope="scope">
                    <el-tag size="small" type="success" v-if="scope.row.enabled">
                    已启用
                    </el-tag>
                    <el-tag size="small" type="danger" v-else>
                    禁用
                    </el-tag>
                </template>
                </el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
            <el-button type="danger" size="small" style="margin-top:8px" @click="deleteMany" :disabled="multipleSelection==0">批量删除</el-button>
        </div>
        <div>
            <el-dialog
                title="职位修改"
                :visible.sync="dialogVisible"
                width="30%" >
                <div>
                    <el-tag>职位名称</el-tag>
                    <el-input class="updatePosInput" size="small" v-model="updatePos.name"></el-input>
                </div>
                <div>
                     <el-tag>状态</el-tag>
                     <el-switch
                        v-model="updatePos.enabled"
                        active-text="已启用"
                        inactive-text="禁用">
                     </el-switch>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" size="small" @click="doUpdate">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    name:'PosMana',
    data(){
        return{
            pos:{
                name:'',
            },
            positions:[],
            dialogVisible: false,
            updatePos:{
                name:'',
                enabled:false,
            },
            multipleSelection: []
        }
    },
    mounted(){
        this.initPositions();
    },
    methods:{
        initPositions(){
            this.getRequest("/system/basic/pos/").then(resp=>{
                if(resp){
                    this.positions=resp;
                }
            })
        },
        handleEdit(index, row) {
           // this.updatePos=row;
            Object.assign(this.updatePos,row)
            this.dialogVisible = !this.dialogVisible
        },
        doUpdate(){
            this.putRequest("/system/basic/pos/",this.updatePos).then(resp=>{
                        if(resp){
                            this.initPositions();
                            this.dialogVisible=false;
                            this.updatePos.name="";
                        }
            })
        },
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该职位, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteRequest("/system/basic/pos/"+row.id).then(resp=>{
                    if(resp){
                        this.initPositions();
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        console.log(index, row);
        },
        addPositions(){
            if(this.pos.name){
                this.postRequest("/system/basic/pos/",this.pos).then(resp=>{
                    if(resp){
                        this.initPositions();
                        this.pos.name="";
                    }
                }                
                )}else{
                 this.$message.error('职位不能为空');
            }
        },
        handleSelectionChange(val) {
        this.multipleSelection = val;
        },
        deleteMany(){
            let ids='?';
            this.multipleSelection.forEach(item=>{
                ids+='ids='+item.id+'&'
            })
            this.deleteRequest("/system/basic/pos/"+ids).then(resp=>{
                if(resp){
                    this.initPositions();
                }
            })
        }
    }
}
</script>

<style>
.addPosInput{
     width:300px;
     margin-right:8px;
}
.PosManaMain{
    margin-top: 10px;
}
.updatePosInput{
    width: 200px;
    margin-left: 8px;
}
</style>