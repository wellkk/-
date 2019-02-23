<template>
    <!-- 用来二次封装面包屑 -->
    <!-- 面包屑 -->
    <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <!-- 此处相当于使用props选项中的数据 -->
        <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
  name: "CusBread",
  data() {
    return {};
  },
  // 声明数据 在props组件中设置数据，相当于给将来用组件的标签添加了对应的属性
  props: ["level1", "level2"]
};
</script>

<style>
</style>
