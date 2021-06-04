<template>
  <div>
    <div class="sidenav">
      <p class="p-3 mb-2 bg-dark text-white">
        User: {{ username
        }}<input
          class="btn btn-sm btn-outline-secondary"
          type="button"
          value="Edit Profile"
          @click="edit(tempat)"
        />
        <input
          class="btn btn-sm btn-outline-secondary"
          type="button"
          value="Logout"
          @click="logout"
        />
      </p>
      <a href="/list/user"><b>Users</b></a>
      <a href="/list/content">Contents</a>
    </div>
    <div>
      <div v-if="role" class="container-fluid p-0" id="listUser">
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
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary"
                    @click="edit(user.id)"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary"
                    @click="hapus(user.id)"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <input
          class="btn btn-md btn-outline-dark"
          type="button"
          value="Create User"
          @click="create"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: null,
      username: null,
      role: "",
      tempat: "",
    };
  },
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push("/login");
    }
    this.username = this.$store.getters.getUser[0].user;
    this.role = this.$store.getters.getUser[0].isAdmin;
    this.tempat = this.$store.getters.getUser[0].id;
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
      console.log(typeof id);
      axios
        .delete("https://aris.hollacode.com/users/delete", {
          data: {
            id: id,
          },
        })
        .catch((err) => {
          console.log(err.message);
        })
        .then((response) => {
          axios
            .get("https://aris.hollacode.com/users")
            .then((response) => (this.users = response.data));
        });
    },
  },
  mounted() {
    axios
      .get("https://aris.hollacode.com/users")
      .then((response) => (this.users = response.data));
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
