<template lang="html">
  <div class="event_popup_area" v-show="popupDisplay" @click.self="closePopup">
    <div class="event_popup" :style="popupStyle">
      <input type="text" name="" value="" placeholder="제목" autofocus v-model="eventInfo.title">
      <div class="date_select">
        <span @click="dateSelect" @blur="miniCalendarDisplay=false">{{eventInfo.sdate}}</span>
         -
         <span @click="dateSelect">{{eventInfo.edate}}</span>
        <mini-calendar v-show="miniCalendarDisplay"></mini-calendar>
      </div>
      <div class="save_btn">
        <span @click="addEvent">저장</span>
      </div>
    </div>
    <div class="event_bar" :style="eventBarStyle">
      (제목 없음)
    </div>
  </div>
</template>

<script>
import eventBus from '../EventBus'
import miniCalendar from './miniCalendar'
export default {
  name: 'event-popup',
  components: { miniCalendar },
  props: ['userNo'],
  created: function () {
    eventBus.$on('add-event', this.showPopup)
    eventBus.$on('view-event',this.viewEvent)
  },
  data: function () {
    return {
      popupDisplay: false,
      popupStyle: {
        top: 0,
        left: 0
      },
      eventBarStyle: {
        width: 0,
        top: 0,
        left: 0
      },
      miniCalendarDisplay: false,
      eventInfo: {
        sdate: '2019-2-14 00:00:00',
        edate: '2019-2-14 00:00:00',
        title: ''
      },
      activeBar: ''
    }
  },
  methods: {
    showPopup: function (celTop, celLeft, celWidth, date, month) {
      // 팝업 스타일 설정
      this.popupDisplay = true
      this.popupStyle.top = celTop + 'px'
      var left = celLeft + celWidth + 10 // 달력 칸 시작위치 + 칸 가로크기 + 여백
      if (window.innerWidth - 390 < left) left = celLeft - 420 // 칸 시작위치 - 팝업 가로크기 - 여백
      this.popupStyle.left = left + 'px'
      // 바 스타일 설정
      this.eventBarStyle.width = celWidth + 'px'
      this.eventBarStyle.left = celLeft + 'px'
      this.eventBarStyle.top = celTop + 30 + 'px'
      this.eventBarStyle.display = ''
      this.eventInfo.sdate = '2019-'+month+'-'+date+' 00:00:00'
      this.eventInfo.edate = '2019-'+month+'-'+date+' 00:00:00'
    },
    closePopup: function () {
      this.popupDisplay = false
      this.activeBar.style.position = 'static'
    },
    addEvent: function () {
      this.$http.post('/api/calendar/add', {
        sdate: this.eventInfo.sdate,
        edate: this.eventInfo.edate,
        title: this.eventInfo.title,
        userNo: this.userNo
      }).then((response) => {
        if (response.data.result === 0) {
          alert('일정 추가에 실패하였습니다')
        }
        if (response.data.result === 1) {
          this.popupDisplay = false
          this.eventInfo.title = ''
          eventBus.$emit('save-event')
        }
      }).catch(function (error) {
        alert(error)
      })
    },
    viewEvent: function(celTop, celLeft, celWidth, bar, title) {
      // 팝업 스타일 설정
      this.popupDisplay = true
      this.popupStyle.top = celTop + 'px'
      var left = celLeft + celWidth + 10 // 달력 칸 시작위치 + 칸 가로크기 + 여백
      if (window.innerWidth - 390 < left) left = celLeft - 420 // 칸 시작위치 - 팝업 가로크기 - 여백
      this.popupStyle.left = left + 'px'
      this.eventBarStyle.display = 'none'
      // bar 스타일 설정
      bar.style.position = "absolute"
      bar.style.width = celWidth + 'px'
      // bar.style.zIndex= 999
      this.activeBar = bar
      this.eventInfo.title = title


    },
    dateSelect: function () {
      this.miniCalendarDisplay = !this.miniCalendarDisplay
      if (this.miniCalendarDisplay) eventBus.$emit('date-select')
    }
  }
}
</script>

<style lang="css" scoped>
.event_popup_area {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,.5);
  width: 100%;
  height: 100%;
}
.event_popup {
  width: 350px;
  height: 100px;
  background: white;
  position: absolute;
  top: 50px;
  left: 10px;
  padding: 20px 30px;
}
.event_popup input {
  border: none;
  border-bottom: 2px solid #1a73e8;
  font-size: 20pt;
  width: 100%;
}
input:focus {
  outline: none;
}
.date_select {
  text-align: left;
  margin-top: 10px;
  background-color: #f1f3f4;
  padding: 5px;
}
.save_btn {
  text-align: right;
  margin-top: 10px;
}
.save_btn span {
  background-color: #1a73e8;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
}
.event_bar {
  position: absolute;
  top: 789px;
  left: 800px;
  background: rgb(3, 155, 229);
  height: 20px;
  color: white;
  font-size: 10pt;
  text-align: left;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>
