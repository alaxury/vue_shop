<template>
  <!-- <div id="myChart" :style="{width: '600px', height: '300px'}"></div> -->
  <div id="myChart" style="width: 1000px;height: 400px"></div>
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
    console.log(this.a)
    console.log(this)
    // 基于准备好的dom，初始化echarts实例
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
    // this.drawLine()
  },
  methods: {
    // drawLine () {
    //   const myChart = this.$echarts.init(document.getElementById('myChart'))
    //   // 绘制图表
    //   myChart.setOption({
    //     title: { text: '柱状图' },
    //     tooltip: {},
    //     xAxis: {
    //       data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    //     },
    //     yAxis: {},
    //     series: [{
    //       name: '运行中',
    //       type: 'bar',
    //       data: [14, 20, 36, 10, 10, 20]
    //     }]
    //   })
    // }

  }
}
</script>

<style lang="less">
</style>
