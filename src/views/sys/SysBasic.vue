<template>
    <div>
    <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="部门管理" name="first"><DeptMana></DeptMana></el-tab-pane>
        <el-tab-pane label="职位管理" name="second"><PosMana></PosMana></el-tab-pane>
        <el-tab-pane label="职称管理" name="third"><JobLevelMana></JobLevelMana></el-tab-pane>
        <el-tab-pane label="奖惩规则" name="fourth"><EcMana></EcMana></el-tab-pane>
        <el-tab-pane label="权限组" name="fourth2"><PermissMana></PermissMana></el-tab-pane>
    </el-tabs>
    </div>
</template>

<script>
import DeptMana from '../../components/sys/basic/DeptMana'
import EcMana from '../../components/sys/basic/EcMana'
import JobLevelMana from '../../components/sys/basic/JobLevelMana'
import PermissMana from '../../components/sys/basic/PermissMana'
import PosMana from '../../components/sys/basic/PosMana'



export default {
    name:'SysBasic',
    data(){
        return{
            activeName:'first'
        }
    },
    components:{
        DeptMana,
        JobLevelMana,
        EcMana,
        PermissMana,
        PosMana
    }
}
</script>
<style scoped>

</style>