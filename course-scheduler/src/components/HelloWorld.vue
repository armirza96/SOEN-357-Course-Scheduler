<template>
<div>
 <v-row>
    <v-col>
      <div class="rounded-l-xl rounded-r-xl " style="height: 50px; background-color: #d6c5b3; overflow: hidden;"> 
        <span style="background-color: #58513f; height: 100%; width: fit-content; color: #d6c5b3" class="d-inline-flex align-center pa-2">
          Courses
        </span>

        <span v-for="course in courses" :key="course.courseName" style="height: 100%; width: fit-content; color: #58513f" class="d-inline-flex align-center pa-2">
          {{course.courseName}} | 
        </span>
        <v-btn icon color="light-brown" class="float-right pa-2 mx-auto my-auto d-inline-flex align-center h-100" @click="changeState(true)">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
          
      </div>
    </v-col>
  </v-row>

  <v-row v-if="showForm">
    <v-col>
      <div style="width: 80%; background-color:#d6c5b3; border-radius: 15px;" class="float-right pa-4">
        <v-row>
          <v-col>
            <v-btn icon color="light-brown" class="float-right pa-2 mx-auto my-auto d-inline-flex align-center h-100" @click="changeState(false)">
              <v-icon>mdi-cancel</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-0">
          <v-col>
            <div >
              <validation-observer
                ref="observer"
                v-slot="{ invalid }">
                
                <form @submit.prevent="submit">
                  <validation-provider
                    v-slot="{ errors }"
                    name="courseName"
                    rules="required|max:10">
                    <v-text-field
                      v-model="courseName"
                      :counter="10"
                      :error-messages="errors"
                      label="Course Name"
                      required></v-text-field>
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
                      rules="required">
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
                      rules="required">
                      <v-text-field
                        v-model="minimumHours"
                        :error-messages="errors"
                        label="Minimum hours spent per week"
                        required
                      ></v-text-field>
                    </validation-provider>

                    <validation-provider
                      v-slot="{ errors }"
                      name="days"
                      rules="required">
                      <v-select
                        v-model="days"
                        :items="daysItems"
                        :error-messages="errors"
                        label="Days"
                        data-vv-name="days"
                        multiple
                        chips
                        required
                      ></v-select>
                    </validation-provider>

                    <v-container>
                    <h4>Pick your course times: </h4>
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
                          name="courseEndTime">
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
                    <v-btn
                      class="mr-4"
                      type="submit"
                      :disabled="invalid">
                      submit
                    </v-btn>
                    <v-btn @click="clear">
                      clear
                    </v-btn>
                  </form>
                </validation-observer>
              </div>
            </v-col>
          </v-row>
      </div>
    </v-col>
  </v-row>

  <v-row class="fill-height">
    <v-col>
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
          @mousedown:event="startDrag"
          @mousedown:time="startTime"
          @mousemove:time="mouseMove"
          @mouseup:time="endDrag"
          @mouseleave.native="cancelDrag"
        >
          <template v-slot:event="{ event, timed, eventSummary }">
            <div
              class="v-event-draggable"
              v-html="eventSummary()"
            ></div>
            <div
              v-if="timed"
              class="v-event-drag-bottom"
              @mousedown.stop="extendBottom(event)"
            ></div>
          </template>
        </v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</div>
 
</template>
<script>
  import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

  setInteractionMode('eager')

  extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
  })
    extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('regex', {
    ...regex,
    message: '{_field_} {_value_} does not match {regex}',
  })

  extend('email', {
    ...email,
    message: 'Email must be valid',
  })

  export default {
    name: 'HelloWorld',
      components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
     value: '',
      events: [],
      colors: ['#2196F3', '#3F51B5', '#673AB7', '#00BCD4', '#4CAF50', '#FF9800', '#757575'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      dragEvent: null,
      dragStart: null,
      createEvent: null,
      createStart: null,
      extendOriginal: null,
      showForm: false,
      courses: [],
      courseName: '',
      courseCredits: '',
      difficultyLevel: '',
      minimumHours: '',
      days: null,
      daysItems: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      courseCreditsItems: [
        2,
        3,
        3.5,
        4,
        4.5
      ],
      courseStartTime: null,
      courseEndTime: null
    }),
    methods: {
      changeState(showForm) {
        this.showForm = showForm;
      },
      startDrag ({ event, timed }) {
        if (event && timed) {
          this.dragEvent = event
          this.dragTime = null
          this.extendOriginal = null
        }
      },
      startTime (tms) {
        const mouse = this.toTime(tms)
        if (this.dragEvent && this.dragTime === null) {
          const start = this.dragEvent.start
          this.dragTime = mouse - start
        } else {
          this.createStart = this.roundTime(mouse)
          this.createEvent = {
            name: `Event #${this.events.length}`,
            color: this.rndElement(this.colors),
            start: this.createStart,
            end: this.createStart,
            timed: true,
          }
          this.events.push(this.createEvent)
        }
      },
      extendBottom (event) {
        this.createEvent = event
        this.createStart = event.start
        this.extendOriginal = event.end
      },
      mouseMove (tms) {
        const mouse = this.toTime(tms)
        if (this.dragEvent && this.dragTime !== null) {
          const start = this.dragEvent.start
          const end = this.dragEvent.end
          const duration = end - start
          const newStartTime = mouse - this.dragTime
          const newStart = this.roundTime(newStartTime)
          const newEnd = newStart + duration
          this.dragEvent.start = newStart
          this.dragEvent.end = newEnd
        } else if (this.createEvent && this.createStart !== null) {
          const mouseRounded = this.roundTime(mouse, false)
          const min = Math.min(mouseRounded, this.createStart)
          const max = Math.max(mouseRounded, this.createStart)
          this.createEvent.start = min
          this.createEvent.end = max
        }
      },
      endDrag () {
        this.dragTime = null
        this.dragEvent = null
        this.createEvent = null
        this.createStart = null
        this.extendOriginal = null
      },
      cancelDrag () {
        if (this.createEvent) {
          if (this.extendOriginal) {
            this.createEvent.end = this.extendOriginal
          } else {
            const i = this.events.indexOf(this.createEvent)
            if (i !== -1) {
              this.events.splice(i, 1)
            }
          }
        }
        this.createEvent = null
        this.createStart = null
        this.dragTime = null
        this.dragEvent = null
      },
      roundTime (time, down = true) {
        const roundTo = 15 // minutes
        const roundDownTime = roundTo * 60 * 1000
        return down
          ? time - time % roundDownTime
          : time + (roundDownTime - (time % roundDownTime))
      },
      toTime (tms) {
        return new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute).getTime()
      },
      getEventColor (event) {
        const rgb = parseInt(event.color.substring(1), 16)
        const r = (rgb >> 16) & 0xFF
        const g = (rgb >> 8) & 0xFF
        const b = (rgb >> 0) & 0xFF
        return event === this.dragEvent
          ? `rgba(${r}, ${g}, ${b}, 0.7)`
          : event === this.createEvent
            ? `rgba(${r}, ${g}, ${b}, 0.7)`
            : event.color
      },
      getEvents ({ start, end }) {
        const events = []
        const min = new Date(`${start.date}T00:00:00`).getTime()
        const max = new Date(`${end.date}T23:59:59`).getTime()
        const days = (max - min) / 86400000
        const eventCount = this.rnd(days, days + 20)
        for (let i = 0; i < eventCount; i++) {
          const timed = this.rnd(0, 3) !== 0
          const firstTimestamp = this.rnd(min, max)
          const secondTimestamp = this.rnd(2, timed ? 8 : 288) * 900000
          const start = firstTimestamp - (firstTimestamp % 900000)
          const end = start + secondTimestamp
          events.push({
            name: this.rndElement(this.names),
            color: this.rndElement(this.colors),
            start,
            end,
            timed,
          })
        }
        //this.events = events
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      rndElement (arr) {
        return arr[this.rnd(0, arr.length - 1)]
      },
       submit () {
        this.$refs.observer.validate()

        const courseInfo = {
                            courseName: this.courseName, courseCredits: this.courseCredits, 
                            difficultyLevel: this.difficultyLevel, minimumHours: this.minimumHours,
                            courseStartTime: this.courseStartTime, courseEndTime: this.courseEndTime
                          };

        console.log("COURSE: ", JSON.stringify(courseInfo));
        localStorage.setItem(this.courseName, JSON.stringify(courseInfo));

        this.getCourses();
      },
      clear () {
        this.courseName = ''
        this.courseCredits = ''
        this.difficultyLevel = ''
        this.minimumHours = null
        this.courseStartTime = null
        this.courseEndTime = null
        this.$refs.observer.reset()
      },
      getCourses () {
        this.courses = [];
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
        //console.log(key);
          const course = JSON.parse(localStorage.getItem(key));
          console.log(course);
          this.courses.push(course);
        });
      },
    },
    beforeMount() {
      this.getCourses();
    }
  }
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
    content: '';
  }
  &:hover::after {
    display: block;
  }

  .v-picker .v-card {
    // this aint working for some add reason.
    // date pickers are massive idk why
    width: 50% !important;
    max-width: 50% !important;
  }
}
</style>
