import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import ListUsers from "../views/Users.vue";
import Profile from "../views/Profile.vue";
import NewUser from "../views/NewUser.vue";
import Content from "../views/Contents.vue";
import NewContent from "../views/NewContent.vue";
import EditContent from "../views/EditContent.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  // base: "https://aris-job.web.app",
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
      path: "/list/user/profile/:id",
      name: "Profile",
      component: Profile
    },
    {
      path: "/list/user/new",
      name: "NewUser",
      component: NewUser
    },
    {
      path: "/list/content",
      name: "Content",
      component: Content
    },
    {
      path: "/list/content/new",
      name: "NewContent",
      component: NewContent
    },
    {
      path: "/list/content/edit/:id",
      name: "EditContent",
      component: EditContent
    },
  ]
});