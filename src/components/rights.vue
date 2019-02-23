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
    </el-card>
</template>

<script>
export default {};
</script>

<style>
.box {
    height: 100%;
}
</style>
