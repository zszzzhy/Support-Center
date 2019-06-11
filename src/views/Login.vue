<template>
  <main class="login">
    <h1>Please login to continue</h1>
    <SmartForm class="form" :title="title" :operation="operation" :valid="vaild">
      <FormInput name="username" v-model="username" placeholder="Username"/>
      <FormInput name="password" type="password" v-model="password" placeholder="Password"/>
      <template v-if="mode === 'signup'">
        <FormInput
          name="verify-password"
          type="password"
          v-model="password2"
          placeholder="Rectype Password"
          :invalid="retypePasswordError"
        />
        <FormInput name="email" type="email" v-model="email" placeholder="Email"/>
      </template>
      <template slot="actions">
        <template v-if="mode === 'login'">
          <button type="button" class="secondary" @click="mode = 'signup'">Sign up</button>
          <button type="submit" :disabled="!vaild">Login</button>
        </template>
        <template v-else-if="mode === 'signup'">
          <button type="button" class="secondary" @click="mode = 'login'">Back to login</button>
          <button type="submit" :disabled="!vaild">Create account</button>
        </template>
      </template>
    </SmartForm>
  </main>
</template>

<script>
export default {
  data() {
    return {
      mode: "login",
      username: "",
      password: "",
      password2: "",
      email: ""
    };
  },
  computed: {
    // 根据模式更改表单标题
    title() {
      switch (this.mode) {
        case "login":
          return "Login";
        case "signup":
          return "Create a new account";
      }
    },
    // 两密码不一致，高亮显示
    retypePasswordError() {
      return this.password2 && this.password !== this.password2;
    },
    // 检测是否有字段是空
    signupValid() {
      return this.password2 && this.email && !this.retypePasswordError;
    },
    vaild() {
      return (
        this.username &&
        this.password &&
        (this.mode !== "signup" || this.signupValid)
      );
    }
  },
  methods: {
    async operation() {
      await this[this.mode]();
    },
    // 登录
    async login() {
      this.$state.user = await this.$fetch("login", {
        method: "POST",
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      });
      // 登录成功后返回到，之前的页面
      this.$router.replace(this.$route.params.wantedRoute || { name: "home" });
    },
    // 注册账号
    async signup() {
      await this.$fetch("signup", {
        method: "POST",
        body: JSON.stringify({
          username: this.username,
          password: this.password,
          email: this.email
        })
      });
      this.mode = "login";
    }
  }
};
</script>

<style lang="stylus" scoped>
.form {
  >>> .content {
    max-width: 400px;
  }
}
</style>
