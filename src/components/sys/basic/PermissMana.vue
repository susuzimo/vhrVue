<template>
    <div>
        <div class="permissManaTool">
            <el-input size="small" placeholder="请输入角色英文名" v-model="role.name">
                    <template slot="prepend">ROLE_</template>
            </el-input>
            <el-input size="small" placeholder="请输入角色中文名" v-model="role.nameZh"></el-input>
             <el-button size="small" icon="el-icon-plus" type="primary">
                新增
            </el-button>
        </div>
        <div style="margin-top:10px;width:800px">
            <el-collapse v-model="activeName" accordion @change="change">
                <el-collapse-item :title="r.nameZh" :name="r.id" v-for="(r,index) in roles" :key="index">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>可访问的资源</span>
                            <el-button style="float: right; padding: 3px 0;color:red" type="text" icon="el-icon-delete"></el-button>
                        </div>
                        <div>
                            <el-tree 
                                node-key="id"
                                :default-checked-keys="selectMenus"
                                show-checkbox 
                                :data="allMenus" 
                                :props="defaultProps" >
                            </el-tree>
                        </div>
                    </el-card>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
export default {
    name:'PermissMana',
    data(){
        return{
            role:{
                name:'',
                namezh:'',
            },
             activeName: '1',
             roles:[],
             allMenus:[],
             defaultProps: {
                children: 'children',
                label: 'name'
            },
            selectMenus:[]
        }
    },
    mounted(){
        this.initRoles();
    },
    methods:{
        initRoles(){
            this.getRequest("/system/basic/permiss/").then(resp=>{
                if(resp){
                    this.roles=resp;
                }
            })
        },
        change(rid){
            if(rid){
                this.initMenus()
                this.initSelectMenus(rid)
            }

        },
        initMenus(){
            this.getRequest("/system/basic/permiss/menus/").then(resp=>{
                if(resp){
                    this.allMenus=resp;
                }
            })
        },
        initSelectMenus(rid){
            this.getRequest("/system/basic/permiss/mids/"+rid).then(resp=>{
                if(resp){
                    this.selectMenus=resp;
                }
            })
        },
    }
}
</script>

<style scoped>
.permissManaTool .el-input{
    width: 300px;
    margin-right: 6px;
}
.permissManaTool{
  display: flex;
  justify-content: flex-start;
}

</style>