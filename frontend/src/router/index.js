import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import ListUsers from "../views/Users.vue";
import Content from "../views/Contents.vue";
import Profile from "../views/Profile.vue";
import NewUser from "../views/NewUser.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: SignUp
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/list/user",
      name: "ListUsers",
      component: ListUsers
    },
    {
      path: "/list/content",
      name: "Content",
      component: Content
    },
    {
      path: "/list/user/profile/:id",
      name: "Profile",
      component: Profile
    },
    {
      path: "/list/user/new",
      name: "NewUser",
      component: NewUser
    },
  ]
});