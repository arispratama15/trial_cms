<template>
  <div>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Content</th>
            <th scope="col">Author</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="content in contents" :key="content.id">
            <th scope="row">1</th>
            <td>
              <input
                type="text"
                id="myContent"
                v-model="content.content"
                class="header form-control"
                value="content.content"
              />
            </td>
            <td>
              <input
                type="text"
                id="myAuthor"
                v-model="content.author"
                class="header form-control"
                value="content.author"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <input class="btn btn-md btn-outline-dark" type="button" value="Save" @click="save" />
      <input class="btn btn-md btn-outline-dark" type="button" value="Cancel" @click="cancel" />
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService.js";
import axios from "axios";

export default {
  data() {
    return {
      contents: null,
      username: "",
    };
  },
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push("/login");
    }
    this.username = this.$store.getters.getUser.username;
  },
  methods: {
    save() {
      let content = document.getElementById("myContent").value;
      let author = document.getElementById("myAuthor").value;
      axios
        .post(
          "https://aris.hollacode.com/api/content/list/" + this.$route.params.id,
          {
            content: content,
            author: author
          }
        )
        .then((response) => this.$router.push("/list/content"));
    },
    cancel() {
      this.$router.push("/list/content");
    },
  },
  mounted() {
    axios
      .get("https://aris.hollacode.com/api/content/list/" + this.$route.params.id)
      .then((response) => (this.contents = response.data.data));
  },
};
</script>
