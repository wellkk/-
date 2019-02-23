<template>
    <el-card class="box">
        <cus-bread level1="权限管理" level2="角色列表"> </cus-bread>
        <el-button class="btn" type="primary">添加角色</el-button>
        <el-table :data="roles" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-row class="level1" v-for="(item1,i) in scope.row.children" :key="item1.id">
                        <el-col :span="4">
                            <el-tag closable type="danger">{{item1.authName}}</el-tag>
                            <i class="el-icon-arrow-right"></i>
                        </el-col>
                        <el-col :span="20">
                            <el-row v-for="(item2,i) in item1.children" :key="item2.id" class="level2">
                                <el-col :span="4">
                                    <el-tag closable>{{item2.authName}}</el-tag>
                                    <i class="el-icon-arrow-right"></i>

                                </el-col>
                                <el-col :span="20">
                                    <el-tag closable type="warning" v-for="(item3,i) in item2.children" :key="item3.id">{{item3.authName}}</el-tag>
                                </el-col>
                            </el-row>
                        </el-col>

                    </el-row>
                </template>
            </el-table-column>
            <el-table-column type="index" label="#" width="160">
            </el-table-column>
            <el-table-column prop="roleName" label="角色名称" width="200">
            </el-table-column>
            <el-table-column prop="roleDesc" label="角色描述" width="200">
            </el-table-column>
            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <el-row>
                        <el-button type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle size="mini" plain></el-button>
                        <el-button @click="setRole(scope.row)" type="success" icon="el-icon-check" circle size="mini" plain></el-button>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
    </el-card>

</template>

<script>
export default {
  data() {
    return {
      roles: []
    };
  },
  created() {
    this.getRoles();
  },
  methods: {
    setRole() {},
    //   获取角色
    async getRoles() {
      const res = await this.$http.get(`roles`);
      //   console.log(res);
      this.roles = res.data.data;
      console.log(this.roles);
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
.level1,
.level2 {
  margin-bottom: 10px;
}
</style>
