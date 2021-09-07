<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="type" label="类型" min-width="50"> </el-table-column>
    <el-table-column prop="data" label="数据" min-width="50"> </el-table-column>
  </el-table>
</template>
<script>
export default {
  data () {
    return {
      tableData: [
        {
          type: '股票代码',
          data: '王小虎'
        },
        {
          type: '股票名字',
          data: '王小虎'
        },
        {
          type: '今日开盘价',
          data: '王小虎'
        },
        {
          type: '昨日收盘价',
          data: '王小虎'
        },
        {
          type: '当前价格',
          data: '王小虎'
        },
        {
          type: '今日最高价',
          data: '王小虎'
        },
        {
          type: '今日最低价',
          data: '王小虎'
        },
        {
          type: '竞买价，即"买一"报价',
          data: '王小虎'
        },
        {
          type: '竞卖价，即"卖一"报价',
          data: '王小虎'
        },
        {
          type: '成交量',
          data: '王小虎'
        },
        {
          type: '成交金额',
          data: '王小虎'
        },
        {
          type: '日期',
          data: '王小虎'
        },
        {
          type: '时间',
          data: '王小虎'
        }
      ],
      code: null,
      data: null
    }
  },
  created () {
    this.code = this.$route.query.code
  },
  methods: {
    async getData () {
      const self = this
      this.data = await this.$http.get(`http://127.0.0.1:3000/getLiveData?code=${this.code}`)
      this.tableData.map((item, index) => {
        item.data = self.data.data[0][index]
      })
      this.tableData[11].data = self.data.data[0][31]
      this.tableData[12].data = self.data.data[0][32]
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
<style scoped>
</style>
