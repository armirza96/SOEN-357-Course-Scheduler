<template>
   <v-app id="inspire">
      <v-content>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs8 sm5 md4>
                  <v-card class="elevation-8" >
                     <v-toolbar color="#d6c5b3">
                        <v-toolbar-title color="#58513f" class="flex text-center">Sign Up</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                            <v-text-field
                              name="login"
                              v-model="username"
                              label="🧍 Type your Username"
                              type="text"
                              color="#58513f"
                              outlined
                              clearable
                           ></v-text-field>
                           <v-text-field
                              name="login"
                              v-model="email"
                              label="🧍 Type your email"
                              type="text"
                              color="#58513f"
                              outlined
                              clearable
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              name="password"
                              v-model="pass"
                              label="🔒 Type your password"
                              type="password"
                              color="#58513f"
                              outlined
                              clearable
                           ></v-text-field>
                        </v-form>
                        <v-card-actions>
                            <v-btn color="#f5f0ec" to="/" class="flex text-center">Sign Up</v-btn>
                        </v-card-actions>
                     </v-card-text>
                    <v-card-actions>
                        <div class="text-overline mb-4 flex text-center" >
                            Have an account? <a href="/LogIn.vue/" color="#f5f0ec !important"   class="#f5f0ec-text ">LogIn</a>
                        </div>
                        
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-content>
   </v-app>
</template>

<script>
export default {
   name: 'LogIn',
   props: {
      source: String,
   },
    data: () => ({
      username: 'John Doe',  
      email: 'example@mail.com',
      pass: 'Password',
    }),
};
</script>

<style>
</style>
