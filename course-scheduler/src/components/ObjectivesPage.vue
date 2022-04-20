<template>
  <div class="pa-4">
    <v-row>
      <v-col>
        <div class="rounded-l-xl rounded-r-xl" style="height: 50px; background-color: #d6c5b3; overflow: hidden">
          <span
            style="
              background-color: #58513f;
              height: 100%;
              width: fit-content;
              color: #d6c5b3;
            "
            class="d-inline-flex align-center pa-2">
            Objectives
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
            icon
            color="light-brown"
            class="float-right pa-2 mx-auto my-auto d-inline-flex align-center h-100"
            @click="changeState(true)"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-dialog v-model="showForm" width="50%">
      <div style="background-color: #d6c5b3; border-radius: 15px" class="pa-4">
        <v-row>
          <v-col>
            <v-btn
              icon
              color="light-brown"
              class="float-right pa-2 mx-auto my-auto d-inline-flex align-center h-100"
              @click="changeState(false)"
            >
              <v-icon>mdi-cancel</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-0">
          <v-col>
            <div>
              <validation-observer ref="observer" v-slot="{ invalid }">
                <form @submit.prevent="submit">
                  <validation-provider
                    v-slot="{ errors }"
                    name="objectiveName"
                    rules="required|max:10"
                  >
                    <v-text-field
                      v-model="objectiveName"
                      :counter="10"
                      :error-messages="errors"
                      label="Objective Name"
                      required
                    ></v-text-field>
                  </validation-provider>

                  <validation-provider
                    v-slot="{ errors }"
                    name="frequency"
                    rules="required"
                  >
                    <v-text-field
                      v-model="frequency"
                      :error-messages="errors"
                      label="Frequency"
                      required
                    ></v-text-field>
                  </validation-provider>

                  <validation-provider
                    v-slot="{ errors }"
                    name="objectiveType"
                    rules="required"
                  >
                    <v-select
                      v-model="objectiveType"
                      :items="objectiveTypes"
                      :error-messages="errors"
                      label="Objective Type"
                      data-vv-name="objectiveType"
                      chips
                      required
                    ></v-select>
                  </validation-provider>
                  <v-btn class="mr-4" type="submit" :disabled="invalid">
                    submit
                  </v-btn>
                  <v-btn @click="clear"> clear </v-btn>
                </form>
              </validation-observer>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-dialog>

    <v-row>
      <v-col>
        <CustomComponent
         v-for="objective in objectives"
         v-bind:key="objective"
         v-bind:name="objective.name"
         v-bind:type="objective.objectiveType"
         v-bind:total="objective.frequency"
         v-bind:completed="objective.completed"
         ></CustomComponent>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import CustomComponent from "../components/custom.vue";
import { required, digits, email, max, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";


setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});
extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  name: "ObjectivesPage",
  components: {
    ValidationProvider,
    ValidationObserver,
    CustomComponent,
  },
  data: () => ({
    self: null,
    objectives: [],
    objectiveName: "",
    frequency: 0,
    objectiveType: "",
    showForm: false,
    objectiveTypes: [
      "Daily", "Weekly", "Monthly"
    ],
  }),
  methods: {
    changeState(showForm) {
      this.showForm = showForm;
    },
    submit() {
      this.$refs.observer.validate();

      const objective = {
        name: this.objectiveName,
        frequency: this.frequency,
        objectiveType: this.objectiveType,
        completed: 0,
      };

      console.log("objectve: ", JSON.stringify(objective));

      let objectives = JSON.parse(localStorage.getItem("objectives")) ?? {};
      objectives[this.objectiveName] = objective;

      localStorage.setItem("objectives", JSON.stringify(objectives));

      console.log("522",objectives);

      this.getObjectives();
      this.showForm = false;
    },
    clear() {
      this.objectiveName = "";
      this.frequency = 0;
      this.objectiveType = "";
      this.$refs.observer.reset();
    },
    getObjectives() {
      this.objectives = [];
      const objs = JSON.parse(localStorage.getItem("objectives"));
      for(const o in objs) {
        console.log(objs[o]);
        this.objectives.push(objs[o]);
      }
    },
    getObjective(name) {
      let objectives = JSON.parse(localStorage.getItem("objectives")) ?? {};
      let objective = objectives[name];
      objective.completed++;

      if(objective.completed <= objective.frequency) {
        objectives[name] = objective;

        localStorage.setItem("objectives", JSON.stringify(objectives));

        this.getObjectives();
      }
    },
  },
  beforeMount() {
    this.getObjectives();
  },
};
</script>
<style scoped lang="scss">
.v-event-draggable {
  padding-left: 6px;
}
.v-event-timed {
  user-select: none;
  -webkit-user-select: none;
}
.v-event-drag-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  height: 4px;
  cursor: ns-resize;
  &::after {
    display: none;
    position: absolute;
    left: 50%;
    height: 4px;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    width: 16px;
    margin-left: -8px;
    opacity: 0.8;
    content: "";
  }
  &:hover::after {
    display: block;
  }
}

.sched-chip {
  background-color: #58513f !important;
  color: #d6c5b3 !important;
}
</style>
