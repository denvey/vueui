<template>
  <div class="page">
    <Calendar
      :aroud="calendar.aroud"
      :onChange="setCurrentDate"
      :nums="calendar.nums"
      :rangePicker="true"
      :defaultDate="defaultDate"/>
  </div>
</template>

<script>
  import Calendar from '@/components/Calendar';
  export default {
    data() {
      return {
        calendar: {
          open: true,
          aroud: 6, //12个月
          nums: [{
            "reTravelDate": "2016-12-27",
            "availableAmount": 12
          }, {
            "reTravelDate": "2017-01-01",
            "availableAmount": 13
          }, {
            "reTravelDate": "2017-01-02",
            "availableAmount": 13
          }, {
            "reTravelDate": "2017-01-03",
            "availableAmount": 13
          }, {
            "reTravelDate": "2017-02-02",
            "availableAmount": 1
          }]
        },
        defaultDate: {
            form: new Date("2017-06-29"),
            to: new Date("2017-07-01")
        },
      }
    },
    components: {
      Calendar
    },
    methods: {
      setCurrentDate(d) {
        this.currentDate = d;
        console.log(d.form);
        console.log(d.to);
        this.closeCalendar();
      },
      closeCalendar() {
        this.calendar.open = false;
      },
    }
  }
</script>

