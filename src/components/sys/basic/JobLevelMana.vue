<template>
    <div>
       <div>
           <el-input size="small" v-model="jl.name" style="width:300px"    prefix-icon="el-icon-plus" placeholder="请输入职称">

           </el-input>
           <el-select  placeholder="职称等级" size="small" style="margin-left:5px;margin-right:5px" v-model="jl.titleLevel">
                <el-option
                v-for="item in titleLevels"
                :key="item"
                :label="item"
                :value="item">
                </el-option>
          </el-select>
          <el-button size="small" icon="el-icon-plus" type="primary">
                新增
          </el-button>
       </div>
       <div>

       </div>
    </div>
</template>

<script>
export default {
    name:'JobLevelMana',
    data(){
        return{
            jl:{
                name:'',
                titleLevel:'',
            },
            titleLevels:[
                '正高级',
                '副高级',
                '中级',
                '初级',
                '员级'            
            ]
        }
    }
}
</script>

<style scoped>

</style>