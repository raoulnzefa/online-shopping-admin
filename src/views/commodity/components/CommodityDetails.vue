<template>
  <a-card :bordered="bordered">
    <a-steps :current="current" size="small">
      <a-step v-for="item in steps" :key="item" :title="item" />
    </a-steps>
    <div class="steps-content" v-if="current === 0"><StepType /></div>
    <div class="steps-content" v-if="current === 1"><StepInfo /></div>
    <div class="steps-content" v-if="current === 2"><StepAttribute /></div>
    <div class="steps-action" style="text-align:center">
      <a-button
        v-if="current < steps.length - 1"
        type="primary"
        @click="current++"
      >
        下一步
      </a-button>
      <a-button v-if="current === steps.length - 1" type="primary">
        完成
      </a-button>
      <a-button v-if="current > 0" style="margin-left: 8px" @click="current--">
        上一步
      </a-button>
    </div>
  </a-card>
</template>

<script>
import StepType from "./StepType";
import StepInfo from "./StepInfo";
import StepAttribute from "./StepAttribute";
export default {
  data() {
    return {
      bordered: false,
      steps: ["商品分类", "基本信息", "商品属性", "商品信息"],
      current: 0
    };
  },
  components: {
    StepInfo,
    StepType,
    StepAttribute
  },
  methods: {}
};
</script>
