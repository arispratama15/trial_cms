<template>
  <div>
    <h1>Hi Nigga, this is my first CMS Project</h1>
    <p>Hope you like it</p>
    <div>
      <div class="container-fluid p-0" id="listUser">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Content</th>
              <th scope="col">Author</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="content in data" :key="content.id">
              <th scope="row"></th>
              <td>{{ content.content }}</td>
              <td>{{ content.author }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <input type="button" value="Login" @click="login" />
  </div>
</template>

<script>
import AuthService from "@/services/AuthService.js";
import axios from "axios";

export default {
  data() {
    return {
      data: null,
    };
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/content")
      .then((response) => (this.data = response.data.data));
  },
};
</script>
