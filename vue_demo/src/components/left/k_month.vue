<template>
  <div>
    <div :id="ktype" class="myChart"></div>
  </div>
</template>
<script>
export default {
  props: ['ktype'],
  data () {
    return {
      datas: null,
      code: null
    }
  },
  created () {
    this.code = this.$route.query.code
  },
  computed: {},
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      this.datas = await this.$http.get(`http://127.0.0.1:3000/getHistory?code=${this.code}&ktype=${this.ktype}`)
      if (Object.keys(this.datas.data.record).length === 0) {
        alert('查不到该股票')
        return this.$router.push('/')
      }
      this.datas = this.datas.data.record
        .splice(-100, 100)
        .map(item => [item[0], item[1], item[3], item[4], item[2]])
      this.datas = this.splitData(this.datas)
      const self = this
      // let myChart = self.$echarts.getInstanceByDom(document.getElementById(this.ktype))
      // if (myChart == null) { // 如果不存在，就进行初始化
      //   myChart = self.$echarts.init(document.getElementById(this.ktype))
      // }
      const myChart = self.$echarts.init(document.getElementById(this.ktype))
      const upColor = '#ec0000'
      const upBorderColor = '#8A0000'
      const downColor = '#00da3c'
      const downBorderColor = '#008F28'
      myChart.setOption({
        title: {
          text: `${self.ktype}-K线`,
          left: 0
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
        },
        grid: {
          left: '10%',
          right: '10%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
          data: self.datas.categoryData,
          scale: true,
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: { show: false },
          splitNumber: 20,
          min: 'dataMin',
          max: 'dataMax'
        },
        yAxis: {
          scale: true,
          splitArea: {
            show: true
          }
        },
        dataZoom: [
          {
            type: 'inside',
            start: 50,
            end: 100
          },
          {
            show: true,
            type: 'slider',
            top: '90%',
            start: 50,
            end: 100
          }
        ],
        series: [
          {
            name: '日K',
            type: 'candlestick',
            data: self.datas.values,
            itemStyle: {
              color: upColor,
              color0: downColor,
              borderColor: upBorderColor,
              borderColor0: downBorderColor
            },
            markPoint: {
              label: {
                normal: {
                  formatter: function (param) {
                    return param != null ? Math.round(param.value) : ''
                  }
                }
              },
              data: [
                {
                  name: 'XX标点',
                  coord: ['2013/5/31', 2300],
                  value: 2300,
                  itemStyle: {
                    color: 'rgb(41,60,85)'
                  }
                },
                {
                  name: 'highest value',
                  type: 'max',
                  valueDim: 'highest'
                },
                {
                  name: 'lowest value',
                  type: 'min',
                  valueDim: 'lowest'
                },
                {
                  name: 'average value on close',
                  type: 'average',
                  valueDim: 'close'
                }
              ],
              tooltip: {
                formatter: function (param) {
                  return param.name + '<br>' + (param.data.coord || '')
                }
              }
            },
            markLine: {
              symbol: ['none', 'none'],
              data: [
                [
                  {
                    name: 'from lowest to highest',
                    type: 'min',
                    valueDim: 'lowest',
                    symbol: 'circle',
                    symbolSize: 10,
                    label: {
                      show: false
                    },
                    emphasis: {
                      label: {
                        show: false
                      }
                    }
                  },
                  {
                    type: 'max',
                    valueDim: 'highest',
                    symbol: 'circle',
                    symbolSize: 10,
                    label: {
                      show: false
                    },
                    emphasis: {
                      label: {
                        show: false
                      }
                    }
                  }
                ],
                {
                  name: 'min line on close',
                  type: 'min',
                  valueDim: 'close'
                },
                {
                  name: 'max line on close',
                  type: 'max',
                  valueDim: 'close'
                }
              ]
            }
          },
          {
            name: 'MA5',
            type: 'line',
            data: self.calculateMA(5),
            smooth: true,
            lineStyle: {
              opacity: 0.5
            }
          },
          {
            name: 'MA10',
            type: 'line',
            data: self.calculateMA(10),
            smooth: true,
            lineStyle: {
              opacity: 0.5
            }
          },
          {
            name: 'MA20',
            type: 'line',
            data: self.calculateMA(20),
            smooth: true,
            lineStyle: {
              opacity: 0.5
            }
          },
          {
            name: 'MA30',
            type: 'line',
            data: self.calculateMA(30),
            smooth: true,
            lineStyle: {
              opacity: 0.5
            }
          }
        ]
      })
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    splitData (rawData) {
      const categoryData = []
      const values = []
      for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0])
        values.push(rawData[i])
      }
      return {
        categoryData: categoryData,
        values: values
      }
    },
    calculateMA (dayCount) {
      const result = []
      const self = this
      for (var i = 0, len = self.datas.values.length; i < len; i++) {
        if (i < dayCount) {
          result.push('-')
          continue
        }
        var sum = 0
        for (var j = 0; j < dayCount; j++) {
          sum += self.datas.values[i - j][1] * 1
        }
        result.push((sum / dayCount).toFixed(2))
      }
      return result
    }
  }
}
</script>
<style scoped>
.myChart {
  width: 100%;
  height: 100%;
}
</style>
