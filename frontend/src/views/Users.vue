<template>
  <div>
    <div class="sidenav">
      <p>
        User: {{ username
        }}<input type="button" value="Edit Profile" @click="edit(tempat)" />
      </p>
      <a href="/list/user"><b>Users</b></a>
      <a href="/list/content">Contents</a>
    </div>
    <div>
      <div v-if="role" class="container-fluid p-0" id="listUser">
        <input type="button" value="Create User" @click="create" />
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nama</th>
              <th scope="col">Username</th>
              <th scope="col">isAdmin</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <th scope="row">1</th>
              <td>{{ user.nama }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.isAdmin }}</td>
              <td>
                <input type="button" value="Edit" @click="edit(user.id)" />
                <input type="button" value="Delete" @click="hapus(user.id)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <input type="button" value="Logout" @click="logout" />
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService.js";
import axios from "axios";

export default {
  data() {
    return {
      users: null,
      username: "",
      role: "",
      tempat: "",
    };
  },
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push("/login");
    }
    this.username = this.$store.getters.getUser.username;
    this.role = this.$store.getters.getUser.isAdmin;
    this.tempat = this.$store.getters.getUser.id;
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
    edit(id) {
      console.log(id);
      this.$router.push("/list/user/profile/" + id);
    },
    create() {
      this.$router.push("/list/user/new");
    },
    hapus(id) {
      console.log(id);
      axios
        .delete("http://localhost:3000/api/user/list/" + id)
        .then((response) => {
          axios
            .get("http://localhost:3000/api/user/list")
            .then((response) => (this.users = response.data.user));
        });
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/user/list")
      .then((response) => (this.users = response.data.user));
  },
};
</script>

<style>
/* The sidebar menu */
.sidenav {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 160px; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: #111; /* Black */
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px;
}

/* The navigation menu links */
.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover {
  color: #f1f1f1;
}

/* Style page content */
.main {
  margin-left: 160px; /* Same as the width of the sidebar */
  padding: 0px 10px;
}

/* On smaller screens, where height is less than 450px, change the style of the sidebar (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
</style>
