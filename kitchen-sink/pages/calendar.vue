<template>
  <div class="page">
    <Calendar
      :aroud="calendar.aroud"
      :onChange="setCurrentDate"
      :nums="calendar.nums"
      :rangePicker="true"
      :select-date="currentDate"/>
  </div>
</template>

<script>
  import Calendar from '@/components/Calendar';
  export default {
    data() {
      return {
        calendar: {
          open: true,
          aroud: 12, //12个月
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
        currentDate: null,
      }
    },
    components: {
      Calendar
    },
    methods: {
      setCurrentDate(d) {
        this.currentDate = d;
        console.log(d);
        this.closeCalendar();
      },
      closeCalendar() {
        this.calendar.open = false;
      },
    }
  }
</script>
