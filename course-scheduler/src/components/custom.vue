<template>
  <div style="position: relative; overflow: hidden" class="custom-component-bg rounded-pill mt-3" @click="increaseObjectiveCount(name)">
    <div class="progress-bar" v-bind:style="{'width': (completed/total)*100 + '%'}"></div>

    <div class="text-container mx-auto " justify="center" >
      <v-row class="pa-2 px-10">
        <v-col>
          <p class="custom-component-header-text ma-0">{{name}}</p>
          <p class="custom-component-sub-text ma-0">{{this.getSubText(type)}}</p>
        </v-col>
        <v-col style="margin: auto">
          <h1 class="float-right">{{completed}}</h1>

        </v-col>
      </v-row>


    </div>


  </div>

</template>

<script>
import { integer } from 'vee-validate/dist/rules'
  export default {
    name: 'CustomComponent',
    props: {
      name: {required: true, type: String},
      type: {required: true, type: String},
      total: {required: true, type: integer},
      completed: {required: true, type: integer},
    },
    data() {
      return {}
    },
    computed: {},
    mounted() {},
    methods: {
      getSubText(type) {
        let output = "";
        switch(type) {
          case "Weekly":
            output = `THIS WEEK ${this.completed}/${this.total} SESSIONS`; 
          break;
          case "Monthly":
            output = `THIS MONTH ${this.completed}/${this.total} SESSIONS`; 
          break;
          case "Daily":
            output = `TODAY ${this.completed}/${this.total} SESSIONS`; 
          break;
          default:
            output = "NOT FOUND";
          break;
        }
        return output;
      },
      increaseObjectiveCount(name) {
        this.$parent.getObjective(name);
      }
    }
  }
</script>

<style scoped lang="scss">
  .custom-component-bg {
    height: 90px;
    background-color: #58513f;
    width: 100%;
    }

  .text-container {
    color: #d6c5b3;
    top: 0;
    left:0;
    position: absolute;
    width: 100%;
  }
  .custom-component-header-text {
    font-size: 2em;
    letter-spacing: 3px;
    text-transform: uppercase;
    font-weight: bold;
    height: 40px;
  }

  .custom-component-sub-text {
    font-size: 1em;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  
  .progress-bar {
    height: 100%;
    background-color: #f5f0ec;

  }
</style>