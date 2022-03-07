<template>
  <div>
    <el-form
      :rules="rules"
      v-loading="loading"
      element-loading-text="登录中...."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      ref="loginForm"
      :model="loginForm"
      class="loginContainer"
    >
      <h3 class="loginTitle">应急信息平台管理系统</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="loginForm.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          placeholder="请输入密码"
          @keydown.enter.native="submitLogin"
        ></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input
          class="captcha"
          type="text"
          v-model="loginForm.captcha"
          placeholder="点击图片更换验证码"
          @keydown.enter.native="submitLogin"
        ></el-input>
        <img :src="captchaUrl" alt="" @click="updataCaptcha" />
      </el-form-item>
      <el-checkbox v-model="checked" class="loginRemember">记住我</el-checkbox>
      <el-button type="primary" style="width: 100%" @click="submitLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      captchaUrl: "/captcha?time=" + new Date(),
      loginForm: {
        username: "admin",
        password: "123",
        captcha: "",
      },
      loading: false,
      checked: true,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  methods: {
    updataCaptcha() {
      this.captchaUrl = "/captcha?time=" + new Date();
    },
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.postRequest("/login", this.loginForm).then((resp) => {
            if (resp) {
              this.loading = false;
              const tokenStr = resp.obj.tokenHead + resp.obj.token;
              window.sessionStorage.setItem("tokenStr", tokenStr);
              let path = this.$route.query.redirect;
              this.$router.replace(
                path == "/" || path == undefined ? "/home" : path
              );
            } else {
              this.loading = false;
              this.loginForm.captcha = "";
              this.captchaUrl = "/captcha?time=" + new Date();
            }
          });
        } else {
          this.$message.error("请输入全部信息");

          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6ca;
}
.loginTitle {
  padding: 0px auto 40px auto;
  text-align: center;
}
.loginRemember {
  text-align: left;
  margin: 0px 0px 15px 0px;
}
.captcha {
  width: 250px;
  margin-right: 10px;
}
.el-form-item__content {
  display: flex;
  align-items: center;
}
</style>