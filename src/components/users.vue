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
        <el-input @clear="getAllUsers()" clearable placeholder="请输入内容" v-model="query" class="searchInput">
          <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="primary" @click="showDiaAddUser()">添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="#" width="180">
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
      </el-table-column>
      <el-table-column prop="mobile" label="电话">
      </el-table-column>
      <!-- 过滤器 fmtdate -->
      <el-table-column label="创建日期">
        <template slot-scope="scope">
          <!-- 单元格内容不是prop值 -->
          {{scope.row.create_time|fmtdate}}
        </template>
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch @change="changeState(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button @click="showDiaEditUser(scope.row)" type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
            <el-button @click="showMsgBox(scope.row)" type="danger" icon="el-icon-delete" circle size="mini" plain></el-button>
            <el-button @click="showDiaSetRole()" type="success" icon="el-icon-check" circle size="mini" plain></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <!-- 对话框 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form label-position="left" label-width="80px" :model="formdata">
        <el-form-item label="用户名">
          <el-input v-model="formdata.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formdata.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formdata.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formdata.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 对话框 - 编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form label-position="left" label-width="80px" :model="formdata">
        <el-form-item label="用户名">
          <el-input disabled v-model="formdata.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formdata.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formdata.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 对话框 - 角色 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
      <el-form :model="formdata" label-position="left" label-width="80px">
        <el-form-item label="用户名">
          {{formdata.username}}
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="selectVal" placeholder="请选择角色名称">
            <el-option label="请选择" disabled="" value="shanghai"></el-option>
            <!-- v-for遍历所有角色 动态生成 -->
            <el-option label="区域二" value="beijing"></el-option>

          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleRole = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>

</template>

<script>
export default {
  data() {
    return {
      query: "",
      list: [],
      // 当前页码
      pagenum: 2,
      pagesize: 2,
      total: 10,
      // 对话框显示与隐藏属性
      dialogFormVisibleAdd: false,
      // 添加的表单数据
      formdata: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      dialogFormVisibleEdit: false,
      dialogFormVisibleRole: false,
      selectVal: 1
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    // 分配角色 - 显示对话框
    showDiaSetRole() {
      this.dialogFormVisibleRole = true;
    },
    // 用户状态
    async changeState(user) {
      // console.log(user);

      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      );
      // console.log(res);
      const { meta: { status, msg } } = res.data;
      if (status === 200) {
        this.$message.success("修改用户状态成功");
      }
    },
    // 编辑用户 - 发送请求
    async editUser() {
      const res = await this.$http.put(
        `users/${this.formdata.id}`,
        this.formdata
      );
      // console.log(res);
      const { meta: { msg, status } } = res.data;
      if (status === 200) {
        // 刷新表格
        this.getTableData();
        // 关闭表格
        this.dialogFormVisibleEdit = false;
      }
    },

    // 编辑用户 - 显示对话框
    showDiaEditUser(user) {
      this.dialogFormVisibleEdit = true;
      this.formdata = user;
    },
    // 删除用户
    showMsgBox(user) {
      // 弹出确认删除弹框

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        // 点击确定 执行.then方法
        confirmButtonText: "确定",
        // 点击取消 执行.catch方法
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 发送删除请求
          const res = await this.$http.delete(`users/${user.id}`);
          // console.log(res);
          const { meta: { msg, status } } = res.data;
          if (status === 200) {
            this.$message.success("删除成功!");
            this.pagenum = 1;
            this.getTableData();
          }
        })
        .catch(() => {
          this.$message.info("已取消删除!");
        });
    },
    // 添加用户 - 发送请求
    async addUser() {
      // 发送请求
      const res = await this.$http.post(`users`, this.formdata);
      // console.log(res);

      // 关闭对话框
      this.dialogFormVisibleAdd = false;
      this.getTableData();
    },
    // 添加用户 - 显示对话框
    showDiaAddUser() {
      // 清空
      this.formdata = {};
      this.dialogFormVisibleAdd = true;
    },
    // 清空查询内容--给input添加属性clearble,再加载所有用户
    getAllUsers() {
      this.getTableData();
    },
    // 查询用户
    searchUser() {
      this.pagenum = 1;
      // query是双向绑定，参数在getTableData中
      this.getTableData();
    },
    // 分页方法
    handleSizeChange(val) {
      this.pagenum = 1;
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getTableData();
    },
    //   获取表单数据方法
    async getTableData() {
      const AUTH_TOKEN = localStorage.getItem("token");
      // console.log(AUTH_TOKEN);
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      // console.log(res);
      const { data, meta: { msg, status } } = res.data;
      if (status === 200) {
        this.total = data.total;
        this.list = data.users;
        console.log(this.list);
      }
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
