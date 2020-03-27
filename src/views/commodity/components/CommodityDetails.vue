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
    <div class="steops-content" v-if="current === 3">
      <StepParams
        :defaultCommodity="defaultCommodity"
        @nextStep="nextStep"
        @prevStep="prevStep"
      />
    </div>
    <div class="steops-content" v-if="current === 4">
      <StepContent
        :defaultCommodity="defaultCommodity"
        @nextStep="nextStep"
        @prevStep="prevStep"
      />
    </div>
    <div class="steops-content" v-if="current === 5">
      <StepFunction
        :defaultCommodity="defaultCommodity"
        @nextStep="nextStep"
        @prevStep="prevStep"
      />
    </div>
    <div class="steops-content" v-if="current === 6">
      <StepLogistics
        :defaultCommodity="defaultCommodity"
        @nextStep="nextStep"
        @prevStep="prevStep"
        @putComponents="putComponents"
        @saveComponents="saveComponents"
      />
    </div>
  </a-card>
</template>

<script>
import { addShopping } from "@/api/shop";
import StepType from "./StepType";
import StepInfo from "./StepInfo";
import StepAttribute from "./StepAttribute";
import StepParams from "./StepParams";
import StepContent from "./StepContent";
import StepFunction from "./StepFuntion";
import StepLogistics from "./StepLogistics";
const defaultCommodity = {
  type: ["5dfb4aa328479811c0100d5e", "5dfb4ab628479811c0100d5f"],
  name: "苹果",
  title: "苹果手机",
  brand: "5dfb4ad228479811c0100d60",
  content: "测试测",
  attributeList: [["16GB", "32GB"], ["红色", "黑色"]],
  attributeTableList: [
    {
      _id: 0,
      memory: "16GB",
      color: "红色",
      price: "3999",
      repertory: "9999",
      repertoryWarn: "9999",
      skuNo: "001",
      attributeArr: ["16GB", "红色"]
    },
    {
      _id: 1,
      memory: "16GB",
      color: "黑色",
      price: "3999",
      repertory: "9999",
      repertoryWarn: "9999",
      skuNo: "001",
      attributeArr: ["16GB", "黑色"]
    },
    {
      _id: 2,
      memory: "32GB",
      color: "红色",
      price: "3999",
      repertory: "9999",
      repertoryWarn: "9999",
      skuNo: "001",
      attributeArr: ["32GB", "红色"]
    },
    {
      _id: 3,
      memory: "32GB",
      color: "黑色",
      price: "3999",
      repertory: "9999",
      repertoryWarn: "9999",
      skuNo: "001",
      attributeArr: ["32GB", "黑色"]
    }
  ],
  parameterList: ["2019年", "IOS"],
  presell: false,
  serverGuarantees: ["无忧退货"],
  site: ["11", "110101"],
  cost: 0,
  status: 0
};
export default {
  data() {
    return {
      bordered: false,
      steps: [
        "商品分类",
        "基本信息",
        "商品属性",
        "商品参数",
        "商品描述",
        "商品功能",
        "商品物流"
      ],
      defaultCommodity: defaultCommodity,
      current: 6
    };
  },
  components: {
    StepInfo,
    StepType,
    StepAttribute,
    StepParams,
    StepContent,
    StepFunction,
    StepLogistics
  },
  methods: {
    nextStep(changedFields) {
      this.defaultCommodity = { ...this.defaultCommodity, ...changedFields };
      console.log(this.defaultCommodity);
      this.current++;
    },
    prevStep() {
      this.current--;
    },
    saveComponents(changedFields) {
      this.defaultCommodity = { ...this.defaultCommodity, ...changedFields };
      this.defaultCommodity.status = 1;
      this.addShopping();
    },
    putComponents(changedFields) {
      this.defaultCommodity = { ...this.defaultCommodity, ...changedFields };
      this.defaultCommodity.status = 2;
      this.addShopping();
    },
    addShopping() {
      addShopping(this.defaultCommodity).then(() => {
        this.$message.success("添加成功！");
      });
    }
  }
};
</script>
