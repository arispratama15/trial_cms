<template>
  <div>
    <h1>Login</h1>
    <input type="text" placeholder="Username" v-model="username" />
    <input type="password" placeholder="Password" v-model="password" />
    <input
      class="btn btn-sm btn-outline-dark"
      type="button"
      @click="login"
      value="Login"
    />
    <input
      class="btn btn-sm btn-outline-dark"
      type="button"
      @click="back"
      value="Back"
    />
    <p v-if="msg">{{ msg }}</p>
  </div>
</template>
<script>
import AuthService from "@/services/AuthService.js";

export default {
  data() {
    return {
      username: "",
      password: "",
      msg: "",
    };
  },
  methods: {
    async login() {
      try {
        const credentials = {
          username: this.username,
          password: this.password,
        };
        const response = await AuthService.login(credentials);

        const token = response.access_token;
        const user = response.user;

        this.$store.dispatch("login", { token, user });

        this.$router.push("/list/user");
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    },
    back() {
      this.$router.push("/");
    },
  },
};
</script>
