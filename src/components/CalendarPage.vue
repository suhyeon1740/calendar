<template lang="html">
  <div class="flex" id="calendar">
    <div class="left_area flex">
      <div class="nickname_area">
        <span class="logout_btn"><router-link :to="{ name: 'Login', params: {} }">로그아웃</router-link></span>
        <span class="nickname">{{$route.params.nickname}}</span>
      </div>
      <div class="notice_area">
        <div class="notice">
          <div class="">
            Test
          </div>
          <div class="">
            2월 5일 1:00
          </div>
        </div>
      </div>
    </div>
    <div class="right_area">
      <calendar :userNo="userNo"></calendar>
      <event-popup :userNo="userNo"></event-popup>
    </div>
  </div>
</template>

<script>
import EventPopup from './EventPopup.vue'
import Calendar from './Calendar.vue'
export default {
  name: 'calendarPage',
  components: { EventPopup, Calendar },
  data: function () {
    return {
      userNo: this.$route.params.userNo
    }
  },
  created () {
    this.$http.get('/api/calendar/').then((response) => {
      if(response) {
        this.userNo = response.data.no;
      }
    }).catch(function (error) {
      alert(error)
    })
  }
}
</script>

<style lang="css" scoped>
#calendar {
  height: 100%;
  width: 100%;
  flex-direction: row;
}
#calendar > div {
  height: 100%;
}
.left_area{
  /* background: blue; */
  width: 20%;
  border-right: 1px solid #dadce0;
}
.nickname_area {
  height: 8%;
  border-bottom: 1px solid #dadce0;
  display: flex;
  align-items: center;
}
.logout_btn {
  border: 1px solid #dadce0;
  border-radius: 10%;
  padding: 2px 5px;
  margin: 0 10px;
}
.logout_btn a {
  text-decoration: none;
  color: black;
}
.nickname {
  font-size: 18pt;
}
.left_area .notice {
  height: 92%;
  padding: 2px 10px;
}
.right_area{
  width: 80%;
}

</style>
