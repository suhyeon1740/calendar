<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html, body {
  height: 100%;
}
#app {
  height: 100%;
    width: 100%;
}
.flex {
  display: flex;
  flex-direction: column;
}
</style>
