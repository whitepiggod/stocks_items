<template>
  <div class='box'>
    <div class='month' id='main'></div>
    <k-month class='month' ktype='month'></k-month>
  </div>
</template>
<script>
import kMonth from '../left/k_month.vue'

export default {
  data () {
    return {
      data: [],
      openData: [],
      newData: [],
      maxData: [],
      lowestData: []
    }
  },
  components: {
    kMonth
  },
  methods: {
    createChart () {
      const app = {}
      const close = this.newData
      const max = this.maxData
      const low = this.lowestData
      const open = this.openData
      const chartDom = document.getElementById('main')
      const myChart = this.$echarts.init(chartDom)
      const posList = [
        'left',
        'right',
        'top',
        'bottom',
        'inside',
        'insideTop',
        'insideLeft',
        'insideRight',
        'insideBottom',
        'insideTopLeft',
        'insideTopRight',
        'insideBottomLeft',
        'insideBottomRight'
      ]
      app.configParameters = {
        rotate: {
          min: -90,
          max: 90
        },
        align: {
          options: {
            left: 'left',
            center: 'center',
            right: 'right'
          }
        },
        verticalAlign: {
          options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
          }
        },
        position: {
          options: posList.reduce(function (map, pos) {
            map[pos] = pos
            return map
          }, {})
        },
        distance: {
          min: 0,
          max: 100
        }
      }
      app.config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
        onChange: function () {
          var labelOption = {
            normal: {
              rotate: app.config.rotate,
              align: app.config.align,
              verticalAlign: app.config.verticalAlign,
              position: app.config.position,
              distance: app.config.distance
            }
          }
          myChart.setOption({
            series: [
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              {
                label: labelOption
              }
            ]
          })
        }
      }
      const labelOption = {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
          name: {}
        }
      }
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['开盘', '最新', '最高点', '最低点']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: ['上证指数', 'A股指数', '深证成指', '创业板指']
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true
          }
        ],
        series: [
          {
            name: '开盘',
            type: 'bar',
            barGap: 0,
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: open
          },
          {
            name: '最新',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: close
          },
          {
            name: '最高点',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: max
          },
          {
            name: '最低点',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: low
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    async getData () {
      const self = this
      this.data = await this.$http.get('http://127.0.0.1:3000/getIndex')
      this.data = this.data.data
      const index = ['上证指数', 'Ａ股指数', '深证成指', '创业板指']
      this.data.map(function (item) {
        if (index.indexOf(item.name) !== -1) {
          self.openData.push(parseInt(item.open))
          self.newData.push(parseInt(item.close))
          self.maxData.push(parseInt(item.high))
          self.lowestData.push(parseInt(item.low))
        }
      })
      this.createChart()
    }
  },
  mounted () {
    this.getData()
    this.createChart()
  },
  created () {
    // this.getData()
  }
}
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.month {
  flex: 1;
}
</style>
