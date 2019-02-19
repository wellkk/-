<template>
    <!-- element ui 提供的自带样式的div -->
    <el-card class="box-card">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索框 -->
        <el-row>
            <el-col class="searchBox">
                <el-input placeholder="请输入内容" v-model="query" class="searchInput">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-button type="primary">添加用户</el-button>
            </el-col>
        </el-row>

        <!-- 表格 -->
        <el-table :data="list" style="width: 100%">
            <el-table-column prop="date" label="#" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="邮箱">
            </el-table-column>
            <el-table-column prop="address" label="电话">
            </el-table-column>
            <el-table-column prop="address" label="创建日期">
            </el-table-column>
            <el-table-column prop="address" label="用户状态">
            </el-table-column>
            <el-table-column prop="address" label="操作">
            </el-table-column>
        </el-table>
        <!-- 分页 -->
    </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      list:[]
    };
  },
  created(){
      this.getTableData()
  },
  methods:{
    //   获取表单数据方法
    async getTableData(){
        // get请求不需要请求体
        const res = await  this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
       
         console.log(res);
      }
      
  }
};
</script>

<style>
.searchBox {
  margin-top: 20px;
}
.searchInput {
  width: 400px;
}
</style>
