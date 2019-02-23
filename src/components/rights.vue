<template>
    <!-- 卡片 -->
    <el-card class="box">
        <!-- 面包屑 -->
        <!-- <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb> -->
        <cus-bread level1="权限管理" level2="权限列表"></cus-bread>
        <el-button type="primary" class="btn">添加用户</el-button>
        <el-table height="450px" :data="list" style="width: 100%">
            <el-table-column type=index label="#" width="180">
            </el-table-column>
            <el-table-column prop="authName" label="权限名称" width="180">
            </el-table-column>
            <el-table-column prop="path" label="路径">
            </el-table-column>
             <el-table-column label="层级">
                 <template slot-scope="scope">
                     <span v-if="scope.row.level==='0'">一级</span>
                     <span v-if="scope.row.level==='1'">二级</span>
                     <span v-if="scope.row.level==='2'">三级</span>     
                 </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    // 获取表格数据
    async getTableData() {
      const AUTH_TOKEN = localStorage.getItem("token");
      // console.log(AUTH_TOKEN);
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(`rights/list`);
      //   console.log(res);
      // 解构 - 取值
      const {data,meta:{msg,status}} = res.data;
      if(status === 200){
        //   把获取到的数据给list
          this.list = data;
      }
    }
  }
};
</script>

<style>
.box {
  height: 100%;
}
.btn {
  margin-top: 20px;
}
</style>
