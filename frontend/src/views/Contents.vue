<template>
  <div>
    <div class="sidenav">
      <a href="/list/user">Users</a>
      <a href="/list/content">Contents</a>
    </div>
    <div>
      <h1>Hi {{ username }}</h1>
      <p>{{ secretMessage }}</p>
      <input type="button" value="Logout" @click="logout" />
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService.js";

export default {
  data() {
    return {
      secretMessage: "",
      username: "",
    };
  },
  // async created() {
  //   if (!this.$store.getters.isLoggedIn) {
  //     this.$router.push('/login');
  //   }

  //   this.username = this.$store.getters.getUser.username;

  //   this.secretMessage = await AuthService.getSecretContent();
  // },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
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
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}

</style>