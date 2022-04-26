
<template>
 <div class="pa-4">
      <v-row>
     <v-col>
           <v-btn
      class="mx-2"
      fab
      dark
      color="#d6c5b3"
    >
      <v-icon color = "#58513f">
        mdi-plus
      </v-icon>
    </v-btn>
      </v-col>
   </v-row>
   <v-row>
     <v-col>
       <h2 style="color: #d6c5b3">Schedules</h2>
      </v-col>
   </v-row>
    <v-row>
      <v-col>
        <div class="rounded-l-xl rounded-r-xl" style="height: 50px; background-color: #d6c5b3; overflow: hidden">
          <span
            style="
              height: 100%;
              width: fit-content;
              color: #58513f;
              margin-left: 10px;
            "
            class="d-inline-flex align-center pa-2">
            STUDY ROUTINE
          </span>

          <span
            v-for="obj in objectives"
            :key="obj.name"
            style="
              height: 100%;
              width: fit-content;
              color: #58513f;
              border-right: 1px solid #58513f;
              font-weight: bold;
            "
            class="d-inline-flex align-center pa-2"
          >
            {{ obj.name }}
          </span>
          <v-btn
            rounded
            style="height: 50px;"
            color="#58513f"
            class="#d6c5b3--text float-right pa-2 d-inline-flex align-center h-100 "
            @click.prevent="goToCalendarPage"
            dark
          >
            Edit
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="rounded-l-xl rounded-r-xl" style="height: 50px; background-color: #d6c5b3; overflow: hidden">
          <span
            style="
              height: 100%;
              width: fit-content;
              color: #58513f;
              margin-left: 10px;
            "
            class="d-inline-flex align-center pa-2">
            EXTRA CURRICULUM
          </span>

          <span
            v-for="obj in objectives"
            :key="obj.name"
            style="
              height: 100%;
              width: fit-content;
              color: #58513f;
              border-right: 1px solid #58513f;
              font-weight: bold;
            "
            class="d-inline-flex align-center pa-2"
          >
            {{ obj.name }}
          </span>
          <v-btn
            rounded
            style="height: 50px;"
            color="#58513f"
            class="#d6c5b3--text float-right pa-2 d-inline-flex align-center h-100 "
            @click.prevent="goToCalendarPage"
            dark
          >
            Edit
          </v-btn>
        </div>
      </v-col>
    </v-row>
       <v-row>
     <v-col>
       <h2 style="color: #d6c5b3">Objectives</h2>
      </v-col>
   </v-row>
    <v-row>
      <v-col>
        <div class="rounded-l-xl rounded-r-xl" style="height: 50px; background-color: #d6c5b3; overflow: hidden">
          <span
            style="
              height: 100%;
              width: fit-content;
              color: #58513f;
              margin-left: 10px;
            "
            class="d-inline-flex align-center pa-2">
            PERSONAL GOALS
          </span>

          <span
            v-for="obj in objectives"
            :key="obj.name"
            style="
              height: 100%;
              width: fit-content;
              color: #58513f;
              border-right: 1px solid #58513f;
              font-weight: bold;
            "
            class="d-inline-flex align-center pa-2"
          >
            {{ obj.name }}
          </span>
          <v-btn
            rounded
            style="height: 50px;"
            color="#58513f"
            class=" #d6c5b3--text float-right pa-2 d-inline-flex align-center h-100 "
            @click.prevent="goToObjectivePage"
            dark
          >
          
            <span color="#d6c5b3">Edit</span>
          </v-btn>
        </div>
      </v-col>
    </v-row>
 </div>

 
</template>
<script>
export default {
  name: "Home_Page",
  props: {
    source: String,
  },
  methods:{
      goToCalendarPage(){
        this.$router.push({path: '/Calendar'})
      },
      goToObjectivePage(){
        this.$router.push({path: '/Objectives'})
      },
  },
};
</script>
<style >
.v-btn--active .v-btn__content { 
  color: #d6c5b3
}  
</style>
