<template>
  <div class="pa-4">
    <v-row>
      <v-col>
        <div
          class="rounded-l-xl rounded-r-xl"
          style="height: 50px; background-color: #d6c5b3; overflow: hidden"
        >
          <span
            style="
              background-color: #58513f;
              height: 100%;
              width: fit-content;
              color: #d6c5b3;
            "
            class="d-inline-flex align-center pa-2"
          >
            Courses
          </span>

          <span
            v-for="course in courses"
            :key="course.courseName"
            style="
              height: 100%;
              width: fit-content;
              color: #58513f;
              border-right: 1px solid #58513f;
              font-weight: bold;
            "
            class="d-inline-flex align-center pa-2"
          >
            {{ course.courseName }}
          </span>
          <v-btn
            icon
            color="light-brown"
            class="float-right mx-auto my-1 d-inline-flex align-center"
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
                    name="courseName"
                    rules="required|max:10"
                  >
                    <v-text-field
                      v-model="courseName"
                      :counter="10"
                      :error-messages="errors"
                      label="Course Name"
                      required
                    ></v-text-field>
                  </validation-provider>

                  <validation-provider
                    v-slot="{ errors }"
                    name="courseCredits"
                    rules="required"
                  >
                    <v-select
                      v-model="courseCredits"
                      :items="courseCreditsItems"
                      :error-messages="errors"
                      label="Course Credits"
                      data-vv-name="courseCredits"
                      required
                    ></v-select>
                  </validation-provider>

                  <validation-provider
                    v-slot="{ errors }"
                    name="difficultyLevel"
                    rules="required"
                  >
                    <v-slider
                      hint="Please select this courses difficulty level"
                      max="10"
                      min="0"
                      v-model="difficultyLevel"
                      :error-messages="errors"
                      label="Level of Difficulty"
                      ticks="always"
                      tick-size="1"
                      thumb-color="#58513f"
                      color="red"
                      thumb-label="always"
                      track-color="white"
                      required
                    ></v-slider>
                  </validation-provider>

                  <validation-provider
                    v-slot="{ errors }"
                    name="minimumHours"
                    rules="required"
                  >
                    <v-text-field
                      v-model="minimumHours"
                      :error-messages="errors"
                      label="Minimum hours spent per week"
                      required
                    ></v-text-field>
                  </validation-provider>

                  <!-- <validation-provider
                    v-slot="{ errors }"
                    name="days"
                    rules="required"
                  > -->
                  <!-- <v-select
                      v-model="days"
                      :items="daysItems"
                      :error-messages="errors"
                      label="Days"
                      data-vv-name="days"
                      multiple
                      chips
                      required
                    ></v-select> -->
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="dates"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-combobox
                        v-model="dates"
                        multiple
                        chips
                        small-chips
                        label="Multiple picker in menu"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-combobox>
                    </template>
                    <v-date-picker v-model="dates" multiple no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(dates)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                  <!-- </validation-provider> -->

                  <v-container>
                    <h4>Pick your course times:</h4>
                    <v-row>
                      <v-col>
                        <validation-provider
                          v-slot="{ errors }"
                          rules="required"
                          name="courseStartTime"
                        >
                          <v-time-picker
                            ampm-in-title
                            :error-messages="errors"
                            label="Course Start Time"
                            format="ampm"
                            v-model="courseStartTime"
                          ></v-time-picker>
                        </validation-provider>
                      </v-col>
                      <v-col>
                        <validation-provider
                          v-slot="{ errors }"
                          rules="required"
                          name="courseEndTime"
                        >
                          <v-time-picker
                            ampm-in-title
                            :error-messages="errors"
                            label="Course End Time"
                            format="ampm"
                            v-model="courseEndTime"
                          ></v-time-picker>
                        </validation-provider>
                      </v-col>
                    </v-row>
                  </v-container>
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
        <div style="background-color: #d6c5b3" class="pa-4 rounded-lg">
          <h4>Free days</h4>
          <v-chip
            v-for="day in daysItems"
            :key="day"
            class="sched-chip pa-2 mr-2"
          >
            {{ day }}
          </v-chip>
        </div>
      </v-col>
    </v-row>

    <v-row class="fill-height">
      <v-col>
        <v-sheet tile height="54" class="d-flex">
          <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon class="ma-2" @click="$refs.calendar.next()">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-sheet>
        <v-sheet height="100%">
          <v-calendar
            ref="calendar"
            v-model="value"
            color="primary"
            type="week"
            :events="events"
            :event-color="getEventColor"
            :event-ripple="false"
            @change="getEvents"
          >
            <!-- <template v-slot:event="{ event, timed, eventSummary }">
              <div class="v-event-draggable" v-html="eventSummary()"></div>
              <div
                v-if="timed"
                class="v-event-drag-bottom"
                @mousedown.stop="extendBottom(event)"
              ></div>
            </template> -->
          </v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>
<script>
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
  name: "Calendar-page",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    value: "",
    events: [],
    colors: [
      "#2196F3",
      "#3F51B5",
      "#673AB7",
      "#00BCD4",
      "#4CAF50",
      "#FF9800",
      "#757575",
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
    dragEvent: null,
    dragStart: null,
    createEvent: null,
    createStart: null,
    extendOriginal: null,
    showForm: false,
    courses: [],
    courseName: "",
    courseCredits: "",
    difficultyLevel: "",
    minimumHours: "",
    days: null,
    daysItems: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    dates: [],
    courseCreditsItems: [2, 3, 3.5, 4, 4.5],
    courseStartTime: null,
    courseEndTime: null,
  }),
  methods: {
    changeState(showForm) {
      this.showForm = showForm;
    },
    // startDrag({ event, timed }) {
    //   if (event && timed) {
    //     this.dragEvent = event;
    //     this.dragTime = null;
    //     this.extendOriginal = null;
    //   }
    // },
    // startTime(tms) {
    //   const mouse = this.toTime(tms);
    //   if (this.dragEvent && this.dragTime === null) {
    //     const start = this.dragEvent.start;
    //     this.dragTime = mouse - start;
    //   } else {
    //     this.createStart = this.roundTime(mouse);
    //     this.createEvent = {
    //       name: `Event #${this.events.length}`,
    //       color: this.rndElement(this.colors),
    //       start: this.createStart,
    //       end: this.createStart,
    //       timed: true,
    //     };
    //     this.events.push(this.createEvent);
    //   }
    // },
    // extendBottom(event) {
    //   this.createEvent = event;
    //   this.createStart = event.start;
    //   this.extendOriginal = event.end;
    // },
    // mouseMove(tms) {
    //   const mouse = this.toTime(tms);
    //   if (this.dragEvent && this.dragTime !== null) {
    //     const start = this.dragEvent.start;
    //     const end = this.dragEvent.end;
    //     const duration = end - start;
    //     const newStartTime = mouse - this.dragTime;
    //     const newStart = this.roundTime(newStartTime);
    //     const newEnd = newStart + duration;
    //     this.dragEvent.start = newStart;
    //     this.dragEvent.end = newEnd;
    //   } else if (this.createEvent && this.createStart !== null) {
    //     const mouseRounded = this.roundTime(mouse, false);
    //     const min = Math.min(mouseRounded, this.createStart);
    //     const max = Math.max(mouseRounded, this.createStart);
    //     this.createEvent.start = min;
    //     this.createEvent.end = max;
    //   }
    // },
    // endDrag() {
    //   this.showForm = true;
    //   this.dragTime = null;
    //   this.dragEvent = null;
    //   this.createEvent = null;
    //   this.createStart = null;
    //   this.extendOriginal = null;
    // },
    // cancelDrag() {
    //   if (this.createEvent) {
    //     if (this.extendOriginal) {
    //       this.createEvent.end = this.extendOriginal;
    //     } else {
    //       const i = this.events.indexOf(this.createEvent);
    //       if (i !== -1) {
    //         this.events.splice(i, 1);
    //       }
    //     }
    //   }
    //   this.createEvent = null;
    //   this.createStart = null;
    //   this.dragTime = null;
    //   this.dragEvent = null;
    // },
    roundTime(time, down = true) {
      const roundTo = 15; // minutes
      const roundDownTime = roundTo * 60 * 1000;
      return down
        ? time - (time % roundDownTime)
        : time + (roundDownTime - (time % roundDownTime));
    },
    toTime(tms) {
      return new Date(
        tms.year,
        tms.month - 1,
        tms.day,
        tms.hour,
        tms.minute
      ).getTime();
    },
    getEventColor(event) {
      const rgb = parseInt(event.color.substring(1), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;
      return event === this.dragEvent
        ? `rgba(${r}, ${g}, ${b}, 0.7)`
        : event === this.createEvent
        ? `rgba(${r}, ${g}, ${b}, 0.7)`
        : event.color;
    },
    getEvents({ start, end }) {
      const events = [];
      const min = new Date(`${start.date}T00:00:00`).getTime();
      const max = new Date(`${end.date}T23:59:59`).getTime();
      const days = (max - min) / 86400000;
      const eventCount = this.rnd(days, days + 20);
      for (let i = 0; i < eventCount; i++) {
        const timed = this.rnd(0, 3) !== 0;
        const firstTimestamp = this.rnd(min, max);
        const secondTimestamp = this.rnd(2, timed ? 8 : 288) * 900000;
        const start = firstTimestamp - (firstTimestamp % 900000);
        const end = start + secondTimestamp;
        events.push({
          name: this.rndElement(this.names),
          color: this.rndElement(this.colors),
          start,
          end,
          timed,
        });
      }
      //this.events = events
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    rndElement(arr) {
      return arr[this.rnd(0, arr.length - 1)];
    },
    submit() {
      this.$refs.observer.validate();

      const courseInfo = {
        courseName: this.courseName,
        courseCredits: this.courseCredits,
        difficultyLevel: this.difficultyLevel,
        minimumHours: this.minimumHours,
        courseStartTime: this.courseStartTime,
        courseEndTime: this.courseEndTime,
      };

      // console.log("COURSE: ", JSON.stringify(courseInfo));
      let courses = JSON.parse(localStorage.getItem("courses")) ?? {};
      courses[this.courseName] = courseInfo;
      localStorage.setItem("courses", JSON.stringify(courses));

      let calendarEvents = JSON.parse(localStorage.getItem("events")) ?? {};
      var colorOfClass = this.rndElement(this.colors);
      for (var i = 0; i < this.dates.length; i++) {
        this.createEvent = {
          name: this.courseName,
          color: colorOfClass,
          start: this.dates[i] + " " + this.courseStartTime,
          end: this.dates[i] + " " + this.courseEndTime,
          timed: true,
        };
        this.events.push(this.createEvent);
        calendarEvents[this.dates[i]+this.courseStartTime] = this.createEvent;
        localStorage.setItem("events", JSON.stringify(calendarEvents));
      }

      this.getCalendarEvents();
      this.getCourses();
      this.clear();
      this.showForm = false;
    },
    clear() {
      this.courseName = "";
      this.courseCredits = "";
      this.difficultyLevel = "";
      this.minimumHours = null;
      this.courseStartTime = null;
      this.courseEndTime = null;
      this.$refs.observer.reset();
    },
    getCourses() {
      this.courses = [];
      const courses = JSON.parse(localStorage.getItem("courses"));
      for (const course in courses) {
        console.log(courses[course]);
        this.courses.push(courses[course]);
      }
    },
    getCalendarEvents() {
      this.events = [];
      const calendarEvents = JSON.parse(localStorage.getItem("events"));
      for (const event in calendarEvents) {
        this.events.push(calendarEvents[event]);
      }
    },
  },
  beforeMount() {
    this.getCalendarEvents();
    this.getCourses();
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
// .v-picker.v-card {
//   // this aint working for some add reason.
//   // date pickers are massive idk why
//   width: 48% !important;
//   max-width: 48% !important;
//   overflow: hidden;
// }

.sched-chip {
  background-color: #58513f !important;
  color: #d6c5b3 !important;
}
</style>
