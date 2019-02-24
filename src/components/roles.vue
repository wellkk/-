<template>
    <el-card class="box">
        <cus-bread level1="权限管理" level2="角色列表"> </cus-bread>
        <el-button class="btn" type="primary">添加角色</el-button>
        <el-table :data="roles" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-row class="level1" v-for="(item1,i) in scope.row.children" :key="item1.id">
                        <el-col :span="4">
                            <el-tag @close="deleRights(scope.row,item1)" closable type="danger">{{item1.authName}}</el-tag>
                            <i class="el-icon-arrow-right"></i>
                        </el-col>
                        <el-col :span="20">
                            <el-row v-for="(item2,i) in item1.children" :key="item2.id" class="level2">
                                <el-col :span="4">
                                    <el-tag @close="deleRights(scope.row,item2)" closable>{{item2.authName}}</el-tag>
                                    <i class="el-icon-arrow-right"></i>

                                </el-col>
                                <el-col :span="20">
                                    <el-tag @close="deleRights(scope.row,item3)" closable type="warning" v-for="(item3,i) in item2.children" :key="item3.id">{{item3.authName}}</el-tag>
                                </el-col>
                            </el-row>
                        </el-col>

                    </el-row>
                    <el-row v-if="scope.row.children.length === 0">
                        <el-col>
                            <span>未分配权限</span>
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
                        <el-button @click="showDialogFormVisible(scope.row)" type="success" icon="el-icon-check" circle size="mini" plain></el-button>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
        <!-- 对话框 -->
        <el-dialog title="分配权限" :visible.sync="dialogFormVisibleAdd">
            <el-tree ref="treeDom" :data="treedata" default-expand-all show-checkbox node-key="id" :default-checked-keys="arrCheck" :props="defaultProps">
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
                <el-button type="primary" @click="setRights()">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>

</template>

<script>
export default {
  data() {
    return {
      roles: [],
      dialogFormVisibleAdd: false,
      //   树形结构绑定的数据
      treedata: [],
      //   默认展开的数据
      //   arrExpand:[],
      //   默认选中的数据
      arrCheck: [],
      //   配置选项
      defaultProps: {
        //   lable和children的值来源于树形结构绑定数据treedata中的key名
        label: "authName",
        children: "children"
      },
      currRoleId:''
    };
  },
  created() {
    this.getRoles();
  },
  methods: {
    //   删除角色
    async deleRights(role, rights) {
      // 发送请求  后端收到对应的接口请求就操作了数据库
      const res = await this.$http.delete(
        `roles/${role.id}/rights/${rights.id}`
      );
      // console.log(role,rights);
      console.log(res);
      const { data, meta: { msg, status } } = res.data;
      if (status === 200) {
        //   提示成功
        this.$message.success(msg);
        // 刷新列表
        // this.getRoles();
        // 依然打开对应的角色列表 - 只刷新删除的那组
        role.children = data;
      }

      // 处理响应
    },
    //   添加角色 - 打开对话框
    async showDialogFormVisible(role) {
        this.currRoleId = role.id;
      const res = await this.$http.get(`rights/tree`);
      this.dialogFormVisibleAdd = true;
      //   console.log(res);
      const { data, meta: { msg, status } } = res.data;
      if (status === 200) {
        // 给data赋值
        this.treedata = data;
      }
      const temp = [];
      role.children.forEach(item1 => {
        // temp.push(item1.id);
        item1.children.forEach(item2 => {
          // temp.push(item2.id);
          item2.children.forEach(item3 => {
            temp.push(item3.id);
          });
        });
      });
      //  console.log(temp);
      this.arrCheck = temp;
    },
    // 分配权限
    async setRights() {
      // 获取全选id getCheckedKeys 若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点的 key 所组成的数组
      const arr1 = this.$refs.treeDom.getCheckedKeys();
      console.log(arr1);

      // 获取半选id
      const arr2 = this.$refs.treeDom.getHalfCheckedKeys();
      console.log(arr2);
      // 展开操作运算符
      const arr = [...arr1, ...arr2];
      
      const res = await this.$http.post(`roles/${this.currRoleId}/rights`,{
          rids:arr.join(',')
      });
      console.log(res);
      const {data,meta:{msg,status}} = res.data;
      if(status===200){
          this.dialogFormVisibleAdd = false;
          this.getRoles();
      }
      
      
    },
    //   获取角色
    async getRoles() {
      const res = await this.$http.get(`roles`);
      //   console.log(res);
      this.roles = res.data.data;
      //   console.log(this.roles);
      this.$message.success('设置权限成功')
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
