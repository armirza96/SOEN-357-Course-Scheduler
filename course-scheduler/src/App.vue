<template>
  <v-app>
    <v-main>
      <LogIn/>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import LogIn from './components/LogIn';

export default {
  name: 'App',

  components: {
    // HelloWorld,
    LogIn,
  },

  data: () => ({
    //
  }),
};
</script>
