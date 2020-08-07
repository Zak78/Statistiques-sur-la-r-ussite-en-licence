<template>
    
</template>
<script>
import { Bar } from 'vue-chartjs'
import { Line } from 'vue-chartjs'
export default {
    extends: Bar,
  mounted () {
    this.renderChart(data, options)
  },
  extends: Line,
  props: ['chartdata', 'options'],
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>

