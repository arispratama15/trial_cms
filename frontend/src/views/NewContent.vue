<template>
  <div>
    <div class="container-fluid p-0" id="listUser">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Content</th>
            <th scope="col">Author</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="form-group">
                <textarea
                  class="form-control"
                  id="myContent"
                  rows="3"
                  placeholder="Input Content"
                ></textarea>
              </div>
            </td>
            <td>
              <input
                type="text"
                id="myAuthor"
                placeholder="(default: username)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <input
      class="btn btn-md btn-outline-dark"
      type="button"
      value="Create"
      @click="save"
    />
    <input
      class="btn btn-md btn-outline-dark"
      type="button"
      value="Cancel"
      @click="cancel"
    />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: null,
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
      let author = "";
      if (!document.getElementById("myAuthor").value) {
        author = this.username;
      } else {
        author = document.getElementById("myAuthor").value;
      }
      axios
        .put("https://aris.hollacode.com/api/content/new", {
          content: content,
          author: author,
        })
        .then((response) => this.$router.push("/list/content"));
    },
    cancel() {
      this.$router.push("/list/content");
    },
  },
};
</script>
