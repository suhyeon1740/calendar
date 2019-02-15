<template lang="html">
  <div class="calendar_area">
    <div class="header">
      <span @click="prevCalendar">&#60;</span>
      <span @click="nextCalendar">&#62;</span>
      <span>{{header}}</span>
    </div>
    <div class="calendar">
      <div class="days">
        <span class="day date" v-for="day in days">{{day}}</span>
      </div>
      <div class="dates">
        <div class="date lastDate"  v-for="i in thisMonthDate">
          <span>{{i}}</span>
        </div>
        <div class="date" v-for="i in lastDate">
          <span>{{i}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from '../EventBus'
export default {
  name: 'mini-calendar',
  created: function() {
    eventBus.$on('date-select',this.dateSelect)
  },
  data: function () {
    return {
      days: ['일','월','화','수','목','금','토'],
      today: new Date()
    }
  },
  computed: {
    header: function () {
      return this.today.getFullYear() + "년 " + ( this.today.getMonth() + 1 ) + "월";
    },
    thisMonthDate : function() {
      var doMonth = new Date(this.today.getFullYear(), this.today.getMonth(),1);
      var nextMonth = new Date(this.today.getFullYear(), this.today.getMonth(),0);
      var arr = [];
      for(var i=nextMonth.getDate()-doMonth.getDay()+1; i<=nextMonth.getDate(); i++) {
        arr.push(i);
      }
      return arr;
    },
    lastDate : function () {
      var lastDate = new Date(this.today.getFullYear(), this.today.getMonth()+1, 0);
      return lastDate.getDate();
    }
  },
  methods: {
    todayCalendar: function () {
      this.today = new Date()
    },
    prevCalendar: function () {
      this.today = new Date(this.today.getFullYear(), this.today.getMonth() - 1, this.today.getDate());
    },
    nextCalendar: function () {
      this.today = new Date(this.today.getFullYear(), this.today.getMonth() + 1, this.today.getDate());
    },
    dateSelect: function () {

    }
  }
}
</script>

<style lang="css" scoped>
.calendar_area {
  background-color: white;
  position: absolute;
  width: 300px;
  height: auto;
}
.right_area .header {
  height: 8%;
  /* border-bottom: 1px solid #dadce0; */
  font-size: 11pt;
  display: flex;
  align-items: center;
  color: #3c4043;
  font-weight: bold;
}
.right_area .header > span {
  padding: 0 10px;
  cursor: pointer;
  user-select: none;
}
.right_area .header > span:nth-child(4) {
  cursor: default;
}
.calendar {
  /* height: 92%; */
  text-align: center;
}
.days {
  height: 5%;
  padding-top: 10px;
}
.dates {
  height: 95%;
}
.date {
  width: calc(100% / 7 - 1px);
  float: left;
  /* height: 20%; */
  font-size: 10pt;
}
.date span {
  display: block;
  padding: 10px;
}
.day {
  font-weight: bold;
  height: 100%;
}
.lastDate {
  color: #dadce0;
}
</style>
