import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { GridComponent } from 'echarts/components'
import { Table, TableColumn } from 'element-ui'
// 按需引入echarts
const echarts = require('echarts/lib/echarts')
const axios = require('axios')

require('echarts/lib/component/grid')
require('echarts/lib/chart/candlestick')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/toolbox')
require('echarts/lib/component/legend')
require('echarts/lib/component/dataZoom')
require('echarts/lib/chart/candlestick')
require('echarts/lib/component/markLine')
require('echarts/lib/component/markPoint')
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')

echarts.use([GridComponent])
Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios
Vue.use(Table)
Vue.use(TableColumn)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
