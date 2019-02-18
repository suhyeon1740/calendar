<template lang="html">
  <div id="login">
    <div class="">
      <div class="header">로그인</div>
      <div class="flex">
          <label for="id">아이디</label>
          <input type="text" name="id" value="" v-model="id" @keyup.enter="login">
          <div class="error" v-show="!id && submit">아이디를 입력하세요.</div>
      </div>
      <div class="flex">
          <label for="pw">비밀번호</label>
          <input type="password" name="pw" value="" v-model="pw" @keyup.enter="login">
          <div class="error" v-show="!pw && submit">비밀번호를 입력하세요.</div>
      </div>
      <div class="error" v-show="result">
        아이디 또는 비밀번호를 다시 확인하세요.<br>등록되지 않은 아이디이거나, 아이디 또는 비밀번호를 잘못 입력하셨습니다.
      </div>
      <button type="button" name="button" @click="login">Login</button>
      <a href="#"><router-link :to="{ name: 'SignUp', params: {} }">회원가입</router-link></a>
    </div>
  </div>

</template>

<script>
export default {
  name: 'login',
  data: function () {
    return {
      id: '',
      pw: '',
      submit: false,
      result: false
    }
  },
  methods: {
    login: function () {
      this.submit = false
      this.result = false
      // 계정 확인
      if (this.id && this.pw) {
        this.$http.post('/api/login', {
          id: this.id,
          pw: this.pw
        }).then((response) => {
          if (response.data.result === 0) {
            this.result = true
          }
          if (response.data.result === 1) {
            this.result = false
            this.$router.push({
              name: 'Calendar',
              params: { nickname: response.data.nickname, userNo: response.data.userNo } 
            })
          }
        }).catch(function (error) {
          alert(error)
        })
      } else {
        this.submit = true
      }
    }
  }
}
</script>

<style lang="css" scoped>
  #login {
    height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      position: absolute;
      left: 0;
      top: 0;
  }
  #login > div{
    display: flex;
    flex-direction: column;
    width: 470px;
    margin: 0 auto;
    /* background-color: #f5f5f5; */
    border: 2px solid #eee;
    padding: 10px 30px;
  }
  .header {
    text-align: left;
    border-bottom: 2px solid #eee;
    font-size: 20pt;
  }
  label {
    text-align: left;
    font-weight: bold;
    padding: 5px 0;
    font-size: 15pt;
  }
  input {
    font-size: 15pt;
    color: rgba(33, 32, 36, 0.86);
    padding: 5px 5px;
  }
  #login > div > * {
    margin: 10px 0;
  }
  .error {
    text-align: left;
    color : #ff1616;
    font-size: 10pt;
  }
  button {
    background-color: #1a73e8;
    padding: 15px;
    border-style: none;
    font-size: 12pt;
    color: white;
  }
  #login a{
    text-align: center;
    text-decoration: underline;
    color: black;
  }
</style>
