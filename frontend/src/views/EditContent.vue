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
            <th scope="row"></th>
            <td>
              <input
                type="text"
                id="myContent"
                v-model="content.data.content"
                class="header form-control"
                value="content.content"
              />
            </td>
            <td>
              <input
                type="text"
                id="myAuthor"
                v-model="content.data.author"
                class="header form-control"
                value="content.author"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <input
        class="btn btn-md btn-outline-dark"
        type="button"
        value="Save"
        @click="save"
      />
      <input
        class="btn btn-md btn-outline-dark"
        type="button"
        value="Cancel"
        @click="cancel"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      contents: [],
      username: "",
      id: null,
    };
  },
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push("/login");
    }
    this.username = this.$store.getters.getUser.user;
    this.id = Number(this.$route.params.id);
  },
  methods: {
    save() {
      let content = document.getElementById("myContent").value;
      let author = document.getElementById("myAuthor").value;
      axios
        .put("https://aris.hollacode.com/contents/" + this.$route.params.id, {
          content: content,
          author: author,
        })
        .then((response) => this.$router.push("/list/content"));
    },
    cancel() {
      this.$router.push("/list/content");
    },
  },
  mounted() {
    axios
      .post("https://aris.hollacode.com/contents/list", {
        id: this.id,
      })
      .then((response) => this.contents.push(response.data));
  },
};
</script>
