<template>
  <div class="vueui-calendar">
    <ul class="week">
      <li style="color: #ff6633;">日</li>
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li style="color: #ff6633;">六</li>
    </ul>
    <div class="calendar">
      <div class="calendar-item" v-for="date in dateArr">
        <div class="calendar-header"><span>{{date.y}}年{{date.m}}月</span></div>
        <div class="calendar-body">
          <ul class="days">
            <template v-for="day in date.days">
              <li  v-if="day.date.getMonth() + 1 < date.m">
                <span></span>
              </li>
              <template v-else-if="day.date.getMonth() + 1 > date.m">
              </template>
              <li v-else-if="isToday(day.date)" @click="onSelect(day.date)" :class="{today: day.selected}">
                <span>{{ '今天' }}</span>
                <i>{{getNum(day.date)}}</i>
              </li>
              <li v-else :class="{today: day.selected}">
                <template v-if="day.date < new Date()">
                  <span class="disabled">{{ day.date.getDate() }}</span>
                </template>
                <template v-else>
                  <span @click="onSelect(day.date)">{{ day.date.getDate() }}</span>
                  <i class="nums">{{getNum(day.date)}}</i>
                </template>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        currentDate: {
          currentDay: null,
          currentMonth: null,
          currentYear: null,
          currentWeek: null
        },
        dateArr: [],
        selectDate: {
          form: '',
          to: ''
        }
      }
    },
    props: ['aroud', 'onChange', 'nums', 'defaultDate', 'rangePicker'],
    computed: {},
    created: function () {
      for (let x = 0; x < this.aroud; x++) {
        let days = this.calendarInit(this.currentDate.currentYear, this.currentDate.currentMonth)
        let timeObj = {
          y: this.currentDate.currentYear,
          m: this.currentDate.currentMonth,
          days: days
        }
        this.dateArr.push(timeObj)
      }
    },
    mounted: function () {
      console.log(this.dateArr);
      this.rangSelect(this.defaultDate);
    },
    methods: {
      onSelect: function (day) {
        if (this.rangePicker) {
          if (!!this.selectDate.form && !!this.selectDate.to)  {
            this.selectDate.form = day;
            this.selectDate.to = '';
          }else if (!!this.selectDate.form) {
            if (day < this.selectDate.form) {
              this.selectDate.form = day;
            } else {
              this.selectDate.to = day;
              this.onChange(this.selectDate);
            }
          } else {
            this.selectDate.form = day;
          }
          this.rangSelect(this.selectDate);
        } else {
          this.onChange(day);
        }
      },
      rangSelect: function (params) {
        const formY = this.dateFormat(params.form, 'yyyy');
        const formM = this.dateFormat(params.form, 'M');
        const toY = this.dateFormat(params.to, 'yyyy');
        const toM = this.dateFormat(params.to, 'yyyy');

        for (let i = 0, iLen = this.dateArr.length; i < iLen; i++) {
          for (let j = 0, jLen = this.dateArr[i].days.length; j < jLen; j++) {
            if (this.dateArr[i].days[j].selected) {
              this.dateArr[i].days[j].selected = false;
            }
            if (!!params.form && !!params.to) {
              if (this.dateArr[i].y >= formY && this.dateArr[i].y <= toY && this.dateArr[i].m >= formM && this.dateArr[i].m <= toM) {
                if (this.dateArr[i].days[j].date >= params.form && this.dateArr[i].days[j].date <= params.to) {
                  this.$set(this.dateArr[i].days[j], 'selected', true)
                }
              }
            } else {
              if (this.dateArr[i].y == formY && this.dateArr[i].m == formM) {
                if (this.dateArr[i].days[j].date == params.form) {
                  this.$set(this.dateArr[i].days[j], 'selected', true)
                }
              }
            }
          }
        }
      },
      isCurrentDay: function (day) {
        let d = null
        if (d != null) {
          return day.getFullYear() == d.getFullYear() && day.getMonth() == d.getMonth() && day.getDate() == d.getDate() ? true : false
        } else {
          return day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate() ? true : false
        }
      },
      getNum: function (date) {
        var lastDay = this.nums.length && this.nums[this.nums.length - 1].reTravelDate
        var day = this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
        if (day > lastDay) {
          return ''
        }
        for (var x in this.nums) {
          if (this.nums[x].reTravelDate == day) {
            return '剩' + this.nums[x].availableAmount + '人'
          }
        }
      },
      isToday: function (day) {
        return day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate() ? true : false;
      },
      getDay: function (date) {
        this.currentDate.currentDay = date.getDate();
        this.currentDate.currentYear = date.getFullYear();
        this.currentDate.currentMonth = date.getMonth() + 1;
        this.currentDate.currentWeek = date.getDay() + 1;
        if (this.currentDate.currentWeek == 0) {
          this.currentDate.currentWeek = 7;
        }
      },
      formatDate: function (year, month, day) {
        var y = year;
        var m = month;
        if (m < 10) m = "0" + m;
        var d = day;
        if (d < 10) d = "0" + d;
        return y + "-" + m + "-" + d
      },
      dateFormat: function (date, format) {
        if (typeof date === 'string') {
          date = new Date(date.replace(/-/g, "/"));
        }
        let map = {
          "M": date.getMonth() + 1, //月份
          "d": date.getDate(), //日
          "h": date.getHours(), //小时
          "m": date.getMinutes(), //分
          "s": date.getSeconds(), //秒
          "q": Math.floor((date.getMonth() + 3) / 3), //季度
          "S": date.getMilliseconds() //毫秒
        };
        format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
          let v = map[t];
          if (v !== undefined) {
            if (all.length > 1) {
              v = '0' + v;
              v = v.substr(v.length - 2);
            }
            return v;
          }
          else if (t === 'y') {
            return (date.getFullYear() + '').substr(4 - all.length);
          }
          return all;
        });
        return format;
      },
      calendarInit: function (year, month) {
        var date, d;
        var days = [];
        if (year == null || month == null) {
          var _date = new Date();
          d = new Date(_date.getFullYear(), _date.getMonth() - 1, 1);
        } else {
          d = new Date(year, month - 1, 1);
        }
        d.setDate(42);
        date = new Date(d.getFullYear(), d.getMonth(), 1);
        this.getDay(date);
        for (var i = this.currentDate.currentWeek - 1; i >= 0; i--) {
          var d = new Date(this.currentDate.currentYear, this.currentDate.currentMonth - 1, this.currentDate.currentDay);
          d.setDate(d.getDate() - i);
          days.push({
            date: d
          });
        }
        for (var i = 1; i <= 42 - this.currentDate.currentWeek; i++) {
          var d = new Date(this.currentDate.currentYear, this.currentDate.currentMonth - 1, this.currentDate.currentDay);
          d.setDate(d.getDate() + i);
          days.push({
            date: d
          });
        }
        return days;
      },
    }
  }
</script>

<style lang="less">


  .vueui-calendar {
    font-size: 12px;
    ul {
      margin: 0;
      padding: 0;
    }
    li {
      list-style: none;
    }
  }



  .calendar-list {
    background-color: #fff;
  }

  .calendar {
    padding-top: 0.27rem;
    background: #efeeec;
  }

  .week {
    position: fixed;
    z-index: 50;
    width: 100%;
    background: #F9F8F8;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    li {
      text-align: center;
      height: 40px;
      line-height: 40px;
      vertical-align: middle;
      font-size: 15px;
      /*px*/
      font-weight: bold;
    }
  }

  .calendar-item {
    margin-bottom: 10px;
    background: #ffffff;
    &:nth-of-type(1) {
      margin-top: 40px;
    }
    .calendar-header {
      text-align: center;
      font-size: 15px;
      /*px*/
      color: #333333;
      font-weight: 300;
      padding: 10px 0;
    }
    .calendar-body {
      ul {
        display: flex;
        flex-wrap: wrap;
        /*justify-content: space-around;*/
        li {
          text-align: center;
          height: 49px;
          vertical-align: middle;
          border: none;
          font-weight: 300;
          color: #333;
          width: 14.28%;
          background-color: #fff;
          position: relative;
          border-bottom: 1px solid #e2e2e2;

          display: flex;
          justify-content: center;
          align-items: center;

          &.today {
            /*px*/
            color: #FFFFFF;
            background: #ff6633;

          }
          &.today:first-child {
            border-radius: 3px 0 0 3px;
          }
            span {
              font-size: 15px;
              /*px*/
            }
            i {
              font-size: 18px;
              /*px*/
              display: block;
            }
            .nums {
              color: #37B7FA;
            }
        }

        span[class=disabled] {
          color: #CCCCCC;
        }
      }
    }
  }
</style>
