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
            <th scope="row">1</th>
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
      <ul class="list-group">
        <div>
          <li
            class="list-group-item list-group-item-secondary"
            v-for="user in users"
            :key="user.id"
          >
            {{ user }}
          </li>
        </div>
      </ul>
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
      users: null,
    };
  },
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    }
  },
  methods: {
    save() {
        let inputValue = document.getElementById("myInput").value;
        axios
        .post('https://aris.hollacode.com/api/user/list/' + this.$route.params.id, {
          nama: inputValue
        })
        .then((response) => this.$router.push("/list/user/"))
    },
    cancel() {
        this.$router.push("/list/user");
    }
  },
  mounted() {
    axios
      .get("https://aris.hollacode.com/api/user/list/" + this.$route.params.id)
      .then((response) => (this.users = response.data.user));
  },
};
</script>