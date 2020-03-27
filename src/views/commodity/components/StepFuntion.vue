<template>
  <a-card :bordered="bordered">
    <a-form :form="form">
      <a-form-item label="新品预售" v-bind="formItemLayout">
        <a-switch
          v-decorator="[
            'presell',
            { valuePropName: 'checked', initialValue: true }
          ]"
        />
      </a-form-item>
      <a-form-item label="服务保证" v-bind="formItemLayout">
        <a-checkbox-group
          :options="serverGuarantees"
          v-decorator="[`serverGuarantees`]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayoutWithOutLabel">
        <a-button type="primary" html-type="submit" @click="prevStep">
          上一步
        </a-button>
        <a-button
          type="primary"
          html-type="submit"
          @click="nextStep"
          style="margin-left:20px;"
        >
          下一步
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import FormItemLayout from "@/components/mixin/FormItemLayout";
import CommodityStep from "@/components/mixin/CommodityStep";
const serverGuarantees = ["无忧退货", "极速退款", "免费包邮"];
export default {
  mixins: [FormItemLayout, CommodityStep],
  props: {
    defaultCommodity: Object
  },
  data() {
    return {
      bordered: false,
      serverGuarantees: serverGuarantees
    };
  },
  created() {
    this.form = this.$form.createForm(this, {
      mapPropsToFields: () => {
        return {
          presell: this.$form.createFormField({
            value: this.defaultCommodity.presell
          }),
          serverGuarantees: this.$form.createFormField({
            value: this.defaultCommodity.serverGuarantees
          })
        };
      }
    });
  }
};
</script>
