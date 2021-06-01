<template>
  <div>
    <h1>Hi Nigga, this is my first CMS Project</h1>
    <p>Hope you like it</p>
    <div>
      <div class="album py-5 bg-light">
        <div class="container">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div class="col" v-for="content in data" :key="content.id">
              <div class="card shadow-sm">
                <h5 class="card-title d-flex justify-content-between align-items-center">Author: {{ content.author }}</h5>
                <div class="card-body">
                  <p class="card-text">
                    {{ content.content }}
                  </p>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <input type="button" value="Login" @click="login" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      data: null,
    };
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
  },
  mounted() {
    axios
      .get("https://aris.hollacode.com/contents")
      .then((response) => (this.data = response.data));
  },
};
</script>
