<template lang="html">
  <div class="calendar_area">
    <div class="header">
      <span class="today_btn" @click="todayCalendar">오늘</span>
      <span @click="prevCalendar">&#60;</span>
      <span @click="nextCalendar">&#62;</span>
      <span>{{header}}</span>
    </div>
    <div class="calendar">
      <div class="days">
        <span class="day date" v-for="(day,index) in days" :key="index">{{day}}</span>
      </div>
      <div class="dates">
        <div class="date lastDate"  v-for="i in thisMonthDate" @click="addEvent($event,i)" >
          <div>{{i}}</div>
        </div>
        <div class="date" v-for="i in lastDate" @click.self="addEvent($event,i)" >
          <div>
            <span :class="todayDate(i)">{{i}}</span>
          </div>
          <div v-if="allEvent[i]" class="event_bar" @click="viewEvent($event,i)" :style="barStyle" ref="bar">
            {{allEvent[i].title}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from '../EventBus'
export default {
  name: 'calendar',
  data: function () {
    return {
      days: ['일', '월', '화', '수', '목', '금', '토'],
      today: new Date(),
      allEvent: [],
      barStyle: {
        position: 'static'
      }
    }
  },
  props: ['userNo'],
  created () {
    this.$http.post('/api/calendar/get', {
      userNo: this.userNo,
      year: this.today.getFullYear(),
      month: this.today.getMonth() + 1
    }).then((response) => {
      if (response.data.result === 0) {
        alert('일정 조회에 실패하였습니다')
      }
      if (response.data.result === 1) {
        for (var i = 0; i < response.data.rows.length; i++) {
          var arr = [];
          var date = response.data.rows[i].sdate.substr(8,2)
          this.$set(this.allEvent, date, response.data.rows[i])
        }
      }
    }).catch(function (error) {
      alert(error)
    })
    eventBus.$on('save-event', this.getEvents)
  },
  computed: {
    header: function () {
      return this.today.getFullYear() + '년 ' + (this.today.getMonth() + 1) + '월'
    },
    thisMonthDate: function () {
      var doMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1)
      var nextMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 0)
      var arr = []
      for (var i = nextMonth.getDate() - doMonth.getDay() + 1; i <= nextMonth.getDate(); i++) {
        arr.push(i)
      }
      return arr
    },
    lastDate: function () {
      var lastDate = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0)
      return lastDate.getDate()
    }
  },
  methods: {
    todayCalendar: function () {
      this.today = new Date()
      this.getEvents()
    },
    prevCalendar: function () {
      this.today = new Date(this.today.getFullYear(), this.today.getMonth() - 1, this.today.getDate())
      this.getEvents()
    },
    nextCalendar: function () {
      this.today = new Date(this.today.getFullYear(), this.today.getMonth() + 1, this.today.getDate())
      this.getEvents()
    },
    addEvent: function (event, date) {
      var celTop = event.target.offsetTop
      var celLeft = event.target.offsetLeft
      var celWidth = event.target.clientWidth
      var month = this.today.getMonth() + 1
      eventBus.$emit('add-event', celTop, celLeft, celWidth, date, month)
    },
    viewEvent: function (event, date) {
      var celTop = event.target.offsetTop
      var celLeft = event.target.offsetLeft
      var celWidth = event.target.clientWidth
      var bar = event.target
      var title = this.allEvent[date].title
      eventBus.$emit('view-event', celTop, celLeft, celWidth, bar, title)
    },
    todayDate: function (date) {
      var now = new Date()
      if (now.getMonth() + 1 === this.today.getMonth() + 1 && date === now.getDate()) {
        return { 'today': true }
      }
    },
    getEvents: function () {
      this.allEvent = [];
      this.$http.post('/api/calendar/get', {
        userNo: this.userNo,
        year: this.today.getFullYear(),
        month: this.today.getMonth() + 1
      }).then((response) => {
        if (response.data.result === 0) {
          alert('일정 조회에 실패하였습니다')
        }
        if (response.data.result === 1) {
          for (var i = 0; i < response.data.rows.length; i++) {
            var arr = [];
            var date = response.data.rows[i].sdate.substr(8,2)
            this.$set(this.allEvent, date, response.data.rows[i])
          }
        }
      }).catch(function (error) {
        alert(error)
      })
    }
  }
}
</script>

<style lang="css" scoped>
.calendar_area {
  width: 100%;
  height: 100%;
}
.right_area .header {
  height: 8%;
  border-bottom: 1px solid #dadce0;
  font-size: 20pt;
  display: flex;
  align-items: center;
  color: #3c4043;
}
.right_area .header > span {
  padding: 0 10px;
  cursor: pointer;
  user-select: none;
}
.right_area .header > span:nth-child(4) {
  cursor: default;
}
.today_btn {
  border: 1px solid #dadce0;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 15pt;
  margin-left: 10px;
}
.calendar {
  height: 92%;
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
  height: 20%;
  font-size: 10pt;
  border-right: 1px solid #dadce0;
  border-bottom: 1px solid #dadce0;
}
.date div {
  padding: 10px;
}
.day {
  font-weight: bold;
  height: 100%;
}
.lastDate {
  color: #dadce0;
}
.today {
  background: #1a73e8;
  padding: 4px 6px;
  border-radius: 50%;
  color: white;
  font-weight: bold;
}
.event_bar {
  background: rgb(3, 155, 229);
  height: 20px;
  color: white;
  font-size: 10pt;
  text-align: left;
  padding: 0 10px;
  box-sizing: border-box;
  line-height: 1pt;
  margin-bottom: 2px;
  cursor: pointer;
}
</style>
