<template>
    <div class="login-wrap">
        <el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
            <h2>用户登陆</h2>
            <el-form-item label="用户名">
                <el-input v-model="formdata.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formdata.password"></el-input>
            </el-form-item>
            <el-button
            @click.prevent = handlelogin()
            class="login-btn" type="primary">登录</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // 登录请求
    async handlelogin () {
        const res = await this.$http
        .post(`login`,this.formdata);
        
          console.log(res)
        //   拿到响应数据 解构赋值
            const {data:{
                data:{token},   //这行代码相当于从res中取到token，并解构赋值token=res.data.token
                meta:{msg,status}
                }} = res
                // 判断状态码为200 此时的状态吗是msg中的status
            if(status === 200){
            // console.log("login---success");
            // 找到路由配置中名字是home
            // 通过编程式导航修改路由
            localStorage.setItem("token",token)
            this.$router.push({
                name:'home'
            });
            } else {
            console.log("error---");
            this.$message.error(msg);
            }
            // 若没有找到loin组件
        // catch(err=>{
        //     console.log(err);
            
        
    }
  }
}
</script>

<style>
.login-wrap {
    height: 100%;
    background-color: #324152;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-form {
    background-color: #ffffff;
    width: 400px;
    border-radius: 5px;
    padding: 30px;
}
.login-btn {
width: 100%
}
</style>
