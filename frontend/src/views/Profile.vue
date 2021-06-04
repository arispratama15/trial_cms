<template>
  <div>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nama</th>
            <th scope="col">Change Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <th scope="row"></th>
            <td>{{ user.nama }}</td>
            <td>
              <input
                type="text"
                id="myInput"
                placeholder="Change Name to..."
                class="header form-control"
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
      users: [],
      id: null,
    };
  },
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push("/login");
    }
    console.log(typeof this.$route.params.id);
    this.id = Number(this.$route.params.id);
    console.log(typeof this.id);
  },
  methods: {
    save() {
      let inputValue = document.getElementById("myInput").value;
      let id = this.$route.params.id;
      axios
        .put("https://aris.hollacode.com/users/" + id, {
          id: id,
          nama: inputValue,
        })
        .then((response) => this.$router.push("/list/user/"));
    },
    cancel() {
      this.$router.push("/list/user");
    },
  },
  mounted() {
    axios
      .post("https://aris.hollacode.com/users/profile", {
        id: this.id,
      })
      .then((response) => this.users.push(response.data))
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
