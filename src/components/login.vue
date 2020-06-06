<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar">
                <img src="../assets/avatar.jpg" alt="">
            </div>
            <el-form class="login_form" :model="loginForm" :rules="loginFormRules">
                <el-form-item prop="username" >
                    <el-input  prefix-icon="iconfont icon-user" v-model="loginForm.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="passworld" >
                    <el-input prefix-icon="iconfont icon-3702mima" v-model="loginForm.passwold" placeholder="密码" type="password"></el-input>
                </el-form-item>

                <el-form-item class="btns">
                    <el-button type="primary">登陆</el-button>
                    <el-button type="success">重置</el-button>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '111',
        passwold: '222'
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        passwold: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100%;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .login_form{
        position: absolute;
        bottom: 0;
        padding: 0 20px;
        width: 100%;
        box-sizing: border-box;
       .btns{
            display: flex;
            justify-content: flex-end;
       }
    }
    .avatar{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        padding:5px;
        border: 1px solid #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        img{
            height: 100%;
            border-radius: 50%;
        }
    }
}

</style>
