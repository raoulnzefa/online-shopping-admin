<template>
  <a-card :bordered="bordered">
    <a-form :form="form">
      <a-form-item label="商品描述" v-bind="formItemLayout">
        <a-textarea
          placeholder="Autosize height based on content lines"
          autosize
          v-decorator="[
            'content',
            {
              rules: [{ required: true, message: '描述不能为空' }]
            }
          ]"
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
import FormItemLayoutfrom from "@/components/mixin/FormItemLayout";
import CommodityStep from "@/components/mixin/CommodityStep";
export default {
  mixins: [FormItemLayoutfrom, CommodityStep],
  props: {
    defaultCommodity: Object
  },
  data() {
    return {
      bordered: false
    };
  },
  created() {
    this.form = this.$form.createForm(this, {
      mapPropsToFields: () => {
        return {
          content: this.$form.createFormField({
            value: this.defaultCommodity.content
          })
        };
      }
    });
  }
};
</script>
