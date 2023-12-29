<template>
  <div class="analysis-cards__container">
    <GroupCard
      class="group-card"
      v-for="item in dataCardList"
      :item="item"
      :key="item.id"
    ></GroupCard>
    <el-card class="graph-tab" shadow="never">
      <el-tabs v-model="activeName">
        <el-tab-pane label="流量趋势" name="trend">
          <div class="curved-line__container" ref="lineGraph"></div>
        </el-tab-pane>
        <el-tab-pane label="访问量" name="hits">
          <div class="histogram__container" ref="barGraph"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-card class="graph-card" shadow="never" header="转化率">
      <div class="graph-card__container" ref="transPie"></div>
    </el-card>
    <el-card class="graph-card" shadow="never" header="访问来源">
      <div class="graph-card__container" ref="hitsPie"></div>
    </el-card>
    <el-card class="graph-card" shadow="never" header="成交比例">
      <div class="graph-card__container" ref="complePie"></div>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="Dashboard">
import type { Ref } from 'vue'
import { CardItem } from './components/type'
import GroupCard from './components/GroupCard.vue'
import { ref, unref, onMounted } from 'vue'
import { useChart } from '@/hooks/web/useChart'

const dataCardList: Ref<CardItem[] | null> = ref([
  {
    id: 1,
    title: '访问量',
    type: 'success',
    rangeStr: '月',
    rangeNum: '2000',
    totalNum: '30000',
  },
  {
    id: 2,
    title: '成交额',
    type: '',
    rangeStr: '月',
    rangeNum: '1259',
    totalNum: '54220',
  },
  {
    id: 3,
    title: '下载量',
    type: 'warning',
    rangeStr: '月',
    rangeNum: '5263',
    totalNum: '77758',
  },
  {
    id: 4,
    title: '成交量',
    type: 'info',
    rangeStr: '月',
    rangeNum: '2525',
    totalNum: '42351',
  },
])
const activeName = ref<string>('trend')

const lineGraph: Ref<HTMLDivElement | null> = ref(null)
const barGraph: Ref<HTMLDivElement | null> = ref(null)

const transPie: Ref<HTMLDivElement | null> = ref(null)
const hitsPie: Ref<HTMLDivElement | null> = ref(null)
const complePie: Ref<HTMLDivElement | null> = ref(null)

const option1 = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周天'],
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: '游客',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: '用户',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: '会员',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [150, 232, 201, 154, 190, 330, 410],
    },
  ],
}
const option2 = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
      ],
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: '访问量',
      type: 'bar',
      barWidth: '60%',
      data: [
        23456, 56789, 78901, 34567, 87654, 98765, 12345, 54321, 45678, 87654,
        23456, 78901,
      ],
    },
  ],
}
const transGraphOption = {
  legend: {
    top: 'bottom',
    left: 'center',
    data: ['访问', '购买'],
  },
  grid: {
    left: 'center',
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: '旅游', max: 6500 },
      { name: '教育', max: 16000 },
      { name: '文娱', max: 30000 },
      { name: '医疗', max: 38000 },
      { name: '生鲜', max: 52000 },
      { name: '家居', max: 25000 },
    ],
  },
  series: [
    {
      name: '访问 vs 购买',
      type: 'radar',
      data: [
        {
          value: [5000, 16000, 30000, 35000, 50000, 25000],
          name: '访问',
        },
        {
          value: [3200, 14000, 28000, 26000, 42000, 21000],
          name: '购买',
        },
      ],
    },
  ],
}
const hitsGraphOption = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    top: 'bottom',
    left: 'center',
  },
  series: [
    {
      name: '访问途径',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: 'B站广告' },
        { value: 735, name: '抖音广告' },
        { value: 580, name: '快手广告' },
        { value: 484, name: '微博广告' },
        { value: 300, name: '知乎广告' },
      ],
    },
  ],
}
const compleGraphOption = {
  legend: {
    top: 'bottom',
  },
  series: [
    {
      name: '销量比例',
      type: 'pie',
      radius: [20, 120],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 6,
      },
      data: [
        { value: 40, name: '博德之门3' },
        { value: 38, name: '双人成行' },
        { value: 32, name: '地平线4' },
        { value: 30, name: '潜水员戴夫' },
        { value: 28, name: '杀戮尖塔' },
        { value: 26, name: '武士零' },
        { value: 22, name: '荒野大嫖客2' },
        { value: 18, name: '匹诺曹的谎言' },
      ],
    },
  ],
}

const drawPieGraph = (ref: Ref<HTMLDivElement>, option: any) => {
  const { setOption } = useChart(unref(ref), 'default')
  setOption(option)
}

onMounted(() => {
  drawPieGraph(lineGraph, option1)
  drawPieGraph(barGraph, option2)
  drawPieGraph(transPie, transGraphOption)
  drawPieGraph(hitsPie, hitsGraphOption)
  drawPieGraph(complePie, compleGraphOption)
})
</script>

<style lang="scss" scoped>
.analysis-cards__container {
  display: flex;
  flex-wrap: wrap;

  .group-card {
    flex: calc((100% - 50px) / 4);
    min-width: calc((100% - 50px) / 4);
  }

  @media screen and (width < 1100px) {
    flex-direction: column;

    .group-card,
    .group-card {
      flex: 1;
    }
  }

  .graph-tab {
    width: 100%;
    height: 390px;
    max-height: 400px;
    margin: 5px 10px 0;
  }
  .graph-card {
    flex-basis: calc((100% - 40px) / 3);
    min-width: calc((100% - 40px) / 3);
    height: 400px;
    min-height: 400px;
    margin: 10px 0 10px 10px;
  }
}

.curved-line__container {
  width: 100%;
  height: 300px;
}

.graph-card__container {
  box-sizing: border-box;
  width: 100%;
  height: 350px;
}
</style>
