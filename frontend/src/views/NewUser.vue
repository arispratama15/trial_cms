<template>
  <div>
    <div class="container-fluid p-0" id="listUser">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nama</th>
            <th scope="col">Username</th>
            <th scope="col">Password</th>
            <th scope="col">isAdmin</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="text" id="myName" placeholder="Input Name" />
            </td>
            <td>
              <input type="text" id="myUser" placeholder="Input Username" />
            </td>
            <td>
              <input type="text" id="myPassword" placeholder="Password" />
            </td>
            <td>
              <input type="checkbox" id="isAdmin" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <input type="button" value="Create" @click="save" />
    <input type="button" value="Cancel" @click="cancel" />
  </div>
</template>

<script>
import AuthService from "@/services/AuthService.js";
import axios from "axios";

export default {
  data() {
    return {
      users: null,
    };
  },
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    }
  },
  methods: {
    save() {
      let nama = document.getElementById("myName").value;
      let username = document.getElementById("myUser").value;
      let password = document.getElementById("myPassword").value;
      let isAdmin = document.querySelector("#isAdmin").checked;
      axios
        .put("http://localhost:3000/api/user/new", {
          nama: nama,
          username: username,
          password: password,
          isAdmin: isAdmin
        })
        .then((response) => this.$router.push("/list/user/"));
    },
    cancel() {
      this.$router.push("/list/user");
    },
  },
};
</script>
