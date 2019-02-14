<template lang="html">
  <div class="flex" id="calendar">
    <div class="left_area flex">
      <div class="nickname">
        닉네임
      </div>
      <div class="notice">
        3일 안의 일정 알림
      </div>
    </div>
    <div class="right_area">
      <div class="header">
        2019년 2월
      </div>
      <div class="calendar">
        <span class="date lastDate" v-for="i in nextMonthDate">{{i}}</span>
        <span class="date" v-for="i in lastDate">
          {{i}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'calendar',
  data: function () {
    return {
      days: ['일','월','화','수','목','금','토'],
      today: new Date()
    }
  },
  computed: {
    nextMonthDate : function() {
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
.left_area .nickname {
  height: 10%;
  border-bottom: 1px solid #dadce0;
}
.left_area .notice {
  height: 80%;
}
.right_area{
  width: 80%;
}
.right_area .header {
  height: 10%;
  border-bottom: 1px solid #dadce0;
}
.date {
  width: calc(100% / 7);  
  float: left;
  min-height: 4.5rem;
}
.lastDate {
  background-color: #999;
}
</style>
