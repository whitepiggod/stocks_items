<template>
  <div>
    <header>
      <h1>{{name}}-股票分析图</h1>
    </header>
    <div class="home">
      <cLeft class="left"></cLeft>
      <cMid class="mid"></cMid>
      <cRight class="right"></cRight>
    </div>
  </div>
</template>

<script>
import cLeft from '../components/left/c_left.vue'
import cMid from '../components/mid/c_mid.vue'
import cRight from '../components/right/c_right.vue'

export default {
  name: 'Home',
  data () {
    return {
      name: null
    }
  },
  methods: {
    async getData () {
      const a = await this.$http.get(`http://127.0.0.1:3000/getLiveData?code=${this.$route.query.code}`)
      this.name = a.data[0][1]
    }
  },
  created () {
    this.getData()
  },
  components: {
    cLeft,
    cMid,
    cRight
  }
}
</script>
<style scoped>
  h1 {
    padding-top: 10px;
    text-align: center;
    color: black;
  }
  header {
    height: 3vh;
  }
  .home {
    display: flex;
    width: 100%;
    height: 90vh;
    margin-top: 50px;
  }
  .left {
    flex: 2;
  }
  .mid {
    flex: 1;
  }
  .right {
    flex: 2;
  }
</style>
