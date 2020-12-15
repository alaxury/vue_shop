<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据管理</el-breadcrumb-item>
      <el-breadcrumb-item>图表 </el-breadcrumb-item>
    </el-breadcrumb>
    <div id="myChart" style="width: 1000px; height: 400px"></div>
    <div id="myChart2" :style="{width: '1000px', height: '400px'}"></div>
  </div>
</template>
<script>
export default {
  name: 'Echarts',
  data () {
    return {
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        }
      }
    }
  },
  async mounted () {
    const myChart = this.$echarts.init(document.getElementById('myChart'))
    const { data: res } = await this.$http.get('reports/type/1')
    if (res.meta.status !== 200) {
      return this.$message.error('获取拆线图数据失败')
    }
    res.data.tooltip = {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    }
    myChart.setOption(res.data)
    this.drawLine()
  },
  methods: {
    drawLine () {
      const myChart = this.$echarts.init(document.getElementById('myChart2'))
      // 绘制图表
      myChart.setOption({
        title: { text: '柱状图' },
        tooltip: {},
        xAxis: {
          data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        },
        yAxis: {},
        series: [{
          name: '运行中',
          type: 'bar',
          data: [14, 20, 36, 10, 10, 20]
        }]
      })
    }
  }
}
</script>

<style lang="less">
</style>
