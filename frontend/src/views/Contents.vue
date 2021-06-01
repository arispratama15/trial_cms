<template>
  <div>
    <div class="sidenav">
      <p class="p-3 mb-2 bg-dark text-white">
        User: {{ username
        }}<input class="btn btn-sm btn-outline-secondary" type="button" value="Edit Profile" @click="edit(tempat)" />
        <input class="btn btn-sm btn-outline-secondary" type="button" value="Logout" @click="logout" />
      </p>
      <a href="/list/user">Users</a>
      <a href="/list/content"><b>Contents</b></a>
    </div>
    <div>
      <div class="container-fluid p-0" id="listUser">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Content</th>
              <th scope="col">Author</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="content in contents" :key="content.id">
              <th scope="row">1</th>
              <td>{{ content.content }}</td>
              <td>{{ content.author }}</td>
              <td>
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary"
                    @click="edit(content.id)"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary"
                    @click="hapus(content.id)"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <input class="btn btn-md btn-outline-dark" type="button" value="Create Content" @click="create" />
      <input class="btn btn-md btn-outline-dark" type="button" value="Logout" @click="logout" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      contents: null,
      username: "",
      role: "",
      tempat: "",
    };
  },
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push("/login");
    }
    this.username = this.$store.getters.getUser.user;
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
      this.$router.push("/list/content/edit/" + id);
    },
    create() {
      this.$router.push("/list/content/new");
    },
    hapus(id) {
      console.log(id);
      axios
        .delete("https://aris.hollacode.com/contents/" + id)
        .then((response) => {
          axios
            .get("https://aris.hollacode.com/content")
            .then((response) => (this.contents = response.data));
        });
    },
  },
  mounted() {
    axios
      .get("https://aris.hollacode.com/contents")
      .then((response) => (this.contents = response.data));
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
