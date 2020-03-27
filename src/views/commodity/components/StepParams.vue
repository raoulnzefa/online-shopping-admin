<template>
  <a-card :bordered="bordered">
    <a-form :form="form">
      <a-form-item
        v-for="(item, k) in paramsList"
        :key="item._id"
        :label="item.name"
        v-bind="formItemLayout"
      >
        <a-select
          v-if="item.enter === '1'"
          v-decorator="[
            `parameterList[${k}]`,
            {
              rules: [{ required: true, message: '商品参数不能为空' }]
            }
          ]"
        >
          <a-select-option
            v-for="(value, index) in item.parameter"
            :key="index"
            :value="value"
            >{{ value }}</a-select-option
          >
        </a-select>
        <a-input
          v-if="item.enter === '0'"
          v-decorator="[
            `parameterList[${k}]`,
            {
              rules: [{ required: true, message: '商品参数不能为空' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayoutWithOutLabel">
        <a-button type="primary" @click="prevStep">
          上一步
        </a-button>
        <a-button type="primary" @click="nextStep" style="margin-left:20px;">
          下一步
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { getParameterList } from "@/api/parameter";
import FormItemLayout from "@/components/mixin/FormItemLayout";
import CommodityStep from "@/components/mixin/CommodityStep";
export default {
  mixins: [FormItemLayout, CommodityStep],
  props: {
    defaultCommodity: Object
  },
  data() {
    return {
      bordered: false,
      paramsList: []
    };
  },
  created() {
    const parameterList = {};
    const data = this.defaultCommodity.parameterList;
    this.getParameterList(this.defaultCommodity.type[0]);
    this.form = this.$form.createForm(this, {
      mapPropsToFields: () => {
        data.forEach((index, key) => {
          parameterList[`parameterList[${key}]`] = this.$form.createFormField({
            value: index
          });
        });
        return parameterList;
      }
    });
  },
  methods: {
    getParameterList(typeId) {
      getParameterList(typeId).then(res => {
        this.paramsList = res.data;
      });
    },
    nextStep() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit("nextStep", values);
        }
      });
    },
    prevStep() {
      this.$emit("prevStep");
    }
  }
};
</script>
