<template>
  <a-card :bordered="bordered">
    <a-steps :current="current" size="small">
      <a-step v-for="item in steps" :key="item" :title="item" />
    </a-steps>
    <div class="steps-content" v-if="current === 0">
      <StepType :defaultCommodity="defaultCommodity" @nextStep="nextStep" />
    </div>
    <div class="steps-content" v-if="current === 1">
      <StepInfo
        :defaultCommodity="defaultCommodity"
        @nextStep="nextStep"
        @prevStep="prevStep"
      />
    </div>
    <div class="steps-content" v-if="current === 2">
      <StepAttribute
        :defaultCommodity="defaultCommodity"
        @nextStep="nextStep"
        @prevStep="prevStep"
      />
    </div>
  </a-card>
</template>

<script>
import StepType from "./StepType";
import StepInfo from "./StepInfo";
import StepAttribute from "./StepAttribute";
const defaultCommodity = {
  type: [],
  name: "",
  title: "",
  brand: "",
  attributeList: [
    {
      value: []
    },
    {
      value: []
    }
  ]
};
export default {
  data() {
    return {
      bordered: false,
      steps: ["商品分类", "基本信息", "商品属性", "商品信息"],
      defaultCommodity: defaultCommodity,
      current: 0
    };
  },
  components: {
    StepInfo,
    StepType,
    StepAttribute
  },
  methods: {
    nextStep() {
      this.current++;
    },
    prevStep() {
      this.current--;
    }
  }
};
</script>
