<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs8 sm5 md4>
            <v-card class="elevation-8">
              <v-toolbar color="#d6c5b3">
                <v-toolbar-title color="#58513f" class="flex text-center"
                  >Sign Up</v-toolbar-title
                >
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="submitHandler" id="check-login-form">
                  <v-text-field
                    class="form-control"
                    name="login"
                    placeholder="John Doe"
                    label="🧍 Type your Username"
                    v-model="username"
                    type="text"
                    color="#58513f"
                    outlined
                    clearable
                  ></v-text-field>
                  <v-text-field
                    class="form-control"
                    name="login"
                    placeholder="example@email.com"
                    label="🧍 Type your email"
                    v-model="email"
                    type="text"
                    color="#58513f"
                    outlined
                    clearable
                  ></v-text-field>
                  <v-text-field
                    class="form-control"
                    placeholder="password"
                    label="🔒 Type your password"
                    v-model="password"
                    type="password"
                    color="#58513f"
                    outlined
                    clearable
                  ></v-text-field>
                <v-card-actions>
                  <v-btn color="#f5f0ec" class="flex text-center" type="submit" form="check-login-form">Sign Up</v-btn>
                </v-card-actions>
                </v-form>

              </v-card-text>
              <v-card-actions>
                <div class="text-overline mb-4 flex text-center">
                  Have an account?
                  <a
                    href="/LogIn.vue/"
                    color="#f5f0ec !important"
                    class="#f5f0ec-text">
                    LogIn
                    </a>
                </div>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import Vue from 'vue'   // in Vue 2
// import axios from 'axios'
// import VueAxios from 'vue-axios'

// Vue.use(VueAxios, axios)
export default {
  name: "SignUp",
  props: {
    source: String,
  },
  data(){
      return{
          username: "",
          email: "",
          password: "",
      }
  },
  methods:{
      submitHandler(){
          const data = {
              username: this.username,
              email: this.email,
              password: this.password
          };
        localStorage.setItem(this.email, JSON.stringify(data));
        console.log("localStorage: ",localStorage)
        
      }
  },
};
</script>

<style></style>
