<template>
  <div class="login">
    <div class="box">
      <h1 class="text">请输入你要查询的股票代码：</h1>
      <input type="text" class="inp" ref="text">
      <br>
      <br>
      <button class="sub" @click="toHome">确定</button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    toHome () {
      const value = this.$refs.text.value + ''
      if (/^\d{6}$/.test(value)) {
        this.$router.push({ name: 'Home', query: { code: value } })
      } else {
        alert('请输入6位数字的股票代码')
      }
    }
  }
}
</script>
<style scoped>
  .box {
    margin-top: -250px;
  }
  .inp {
    width: 200px;
    margin-left: 25%;
  }
  .sub {
    width: 20%;
    margin-left: 35%;
  }
  .text {
    color: white;
  }
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: red;
    overflow: hidden;
  }
</style>
