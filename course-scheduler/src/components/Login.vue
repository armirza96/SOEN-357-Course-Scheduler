<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs8 sm5 md4>
            <v-card class="elevation-8">
              <v-toolbar color="#d6c5b3">
                <v-toolbar-title color="#58513f" class="flex text-center"
                  >Login</v-toolbar-title
                >
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="logInHandler" id="check-login-form">
                  <v-text-field
                    name="login"
                    class="form-control"
                    placeholder="example@email.com"
                    v-model="email"
                    label="🧍 Type your email"
                    type="text"
                    color="#58513f"
                    outlined
                    clearable
                  ></v-text-field>
                  <v-text-field
                    class="form-control"
                    placeholder="password"
                    v-model="password"
                    label="🔒 Type your password"
                    type="password"
                    color="#58513f"
                    outlined
                    clearable
                  ></v-text-field>
                    <v-card-actions>
                      <v-btn color="#f5f0ec" type="submit" form="check-login-form" class="flex text-center">Login</v-btn>
                    </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "LogIn",
  props: {
    source: String,
  },
  data(){
      return{
          email: "",
          password: "",
      }
  },  
  methods:{
      logInHandler(){
          const data = {
              email: this.email,
              password: this.password
          };
      console.log("Data: ", data);
      const myJSON = localStorage[this.email];
      const myObj = JSON.parse(myJSON); 
      if(myObj.email == this.email && myObj.password == this.password){
        this.$router.push({path: '/Calendar'})
        console.log("Success");
      }else{
        console.log("Fail to Login");
      }
      }
  },

};
</script>

<style></style>
