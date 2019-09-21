<template>
  <div class="login-container">
    <div class="login-form">
      <a-card title="欢迎登陆">
        <a-form :form="loginForm" @submit="handleSubmit">
          <a-form-item>
            <a-input
              size="large"
              placeholder="用户名"
              v-decorator="[
                'loginName',
                {
                  initialValue: 'admin@qq.com',
                  rules: [{ required: true, message: '请输入用户名' }]
                }
              ]"
            />
          </a-form-item>
          <a-form-item>
            <a-input
              size="large"
              placeholder="密码"
              type="password"
              v-decorator="[
                'password',
                {
                  initialValue: '123456',
                  rules: [{ required: true, message: '请输入密码' }]
                }
              ]"
            />
          </a-form-item>
          <a-form-item>
            <a-button
              size="large"
              type="danger"
              html-type="submit"
              style="width:100%"
            >
              登陆
            </a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: this.$form.createForm(this)
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.loginForm.validateFields((err, values) => {
        if (!err) {
          this.$store
            .dispatch("login", values)
            .then(res => {
              this.getUserInfo(res.userId);
            })
            .catch(() => {});
        }
      });
    },

    getUserInfo(userId) {
      this.$store
        .dispatch("getUserInfo", userId)
        .then(() => {
          this.$router.push("/");
        })
        .catch(() => {
          console.log("error");
        });
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: #eee;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
}
</style>
