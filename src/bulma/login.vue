<template>
  <div class="columns">
    <div class="column">
      <div class="card ju-centered ju-main-card">
        <header class="card-header">
          <div class="card-header-title">
            Login to {{ selectedContest.name }}
          </div>
        </header>
        <div class="card-content">
          <b-field label="Username">
            <b-input v-model="handle" placeholder="Type your handle here" icon="user"
            @keyup.enter.native="formLogin()"></b-input>
          </b-field>
          <b-field label="Password">
            <b-input v-model="password" type="password" placeholder="ssshhh!" icon="lock"
            @keyup.enter.native="formLogin()"></b-input>
          </b-field>
        </div>
        <div class="card-footer">
          <router-link to="/" class="card-footer-item">
            Go Back
          </router-link>
          <a class="card-footer-item" @click="formLogin()">
            Login
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">import * as Api from "./api";
    import { mapGetters } from "vuex";

    export default {
      data() {
        return {
          handle: "",
          password: ""
        };
      },
      computed: {
        ...mapGetters([
          "selectedContest"
        ])
      },
      methods: {
        formLogin() {
          this.$http.post(Api.paths.login, {
            handle: this.handle,
            password: this.password,
            contest: this.$route.query.id === "null"
              ? null
              : this.$route.query.id
          }).then(() => {
            if (this.selectedContest.name === "admin")
              window.location = "/admin";
            else
              this.$router.push("/contest");
            return null;
          }).catch((err) => {
            if (err.status !== 200 && err.status !== 401 && err.status !== 403)
              return this.$jude.toastWithResponse(err);
            this.$jude.toastError(`Login error: ${err.body.error}`);
          });
        }
      }
    };
</script>
