<template>
  <v-app>
    <v-main>
      <SignUp/>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
// import LogIn from './components/LogIn';
import SignUp from './components/SignUp';

export default {
  name: 'App',

  components: {
    // HelloWorld,
    SignUp,
  },

  data: () => ({
    //
  }),
};
</script>
