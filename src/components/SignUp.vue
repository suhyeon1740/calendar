<template lang="html">
  <div class="flex" id="signUp">
    <h1>회원가입</h1>
    <div class="flex">
      <div class="flex">
        <label for="id">아이디</label>
        <input type="text" name="id" value="" v-model="id" @keyup.enter="signUp">
        <div class="error" v-show="!id && submit">아이디를 입력하세요</div>
        <div class="error" v-show="idCheck">이미 존재하는 아이디입니다</div>
      </div>
      <div class="flex">
        <label for="pw">비밀번호</label>
        <input type="password" name="pw" value="" v-model="pw" @keyup.enter="signUp">
        <div class="error" v-show="!pw && submit">비밀번호를 입력하세요</div>
      </div>
      <div class="flex">
        <label for="pwCheck">비밀번호확인</label>
        <input type="password" name="pwCheck" value="" v-model="pwCheck" @keyup.enter="signUp">
        <div class="error" v-show="pwCheck && confirmPw && pwCheck.length>0 ">비밀번호가 일치하지 않습니다</div>
        <div class="error" v-show="!pwCheck && submit">비밀번호 확인을 위해 다시한번 입력 해 주세요</div>
      </div>
      <div class="flex">
        <label for="name">닉네임</label>
        <input type="text" name="name" value="" v-model="nickname" @keyup.enter="signUp">
        <div class="error" v-show="!nickname && submit">닉네임을 입력하세요</div>
      </div>
      <div class="">
        <button type="button" class="button" @click="signUp">회원가입</button>
        <button type="button" class="button cancel_btn" @click="cancel">가입취소</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'signUp',
  data: function () {
    return {
      id: '',
      pw: '',
      pwCheck: '',
      nickname: '',
      submit: false,
      idCheck: false
    }
  },
  computed: {
    confirmPw: function () {
      if (this.pw !== this.pwCheck) return true
      else return false
    }
  },
  methods: {
    signUp: function () {
      this.submit = true
      if (this.id && this.pw && this.pwCheck && this.nickname) {
        this.$http.post('/api/login/signUp', {
          id: this.id,
          pw: this.pw,
          nickname: this.nickname
        }).then((response) => {
          if (response.data.result === 0) {
            this.idCheck = true
          }
          if (response.data.result === 1) {
            alert('가입되었습니다')
            this.$router.push({ name: 'Login', params: {} })
          }
        }).catch(function (error) {
          alert(error)
        })
      }
    },
    cancel: function () {
      this.$router.push({ name: 'Login', params: {} })
    }
  }
}
</script>

<style lang="css" scoped>
#signUp{
  width: 70%;
  margin: 0 auto;
  padding: 10px 30px;
}
h1 {
  font-weight: normal;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}
#signUp > div {
  width: 50%;
  margin: 0 auto;
}
label {
  text-align: left;
  font-weight: bold;
  padding: 5px 0;
}
#signUp > div > * {
  margin: 5px 0;
}
#signUp > div > div:last-child {
  display: block;
  text-align: center;
  padding: 15px 0;
}
.button {
  background-color: #5bc0de;
  color: white;
  border: none;
  padding: 5px 10px;
  font-weight: bold;
}
.cancel_btn {
  background-color: #f0ad4e;
}
.error {
  text-align: left;
  color : #ff1616;
  font-size: 10pt;
}
input {
  font-size: 15pt;
  color: rgba(33, 32, 36, 0.86);
  padding: 5px 5px;
}
</style>
