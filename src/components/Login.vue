<template lang="html">
  <div id="login">
      <div class="id">
          <label for="id">ID</label>
          <input type="text" name="id" value="">
      </div>
      <div class="pw">
          <label for="pw">PW</label>
          <input type="text" name="pw" value="">
      </div>
      <button type="button" name="button">LOGIN</button>
      <a href="#">회원가입</a>
  </div>

</template>

<script>
export default {
  name: 'login'
}
</script>

<style lang="css" scoped>
</style>
