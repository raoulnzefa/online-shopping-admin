<template>
  <a-card :bordered="bordered">
    <a-form :form="form">
      <a-form-item label="发货地" v-bind="formItemLayout">
        <a-cascader
          :options="cityArrList"
          :fieldNames="{ label: 'name', value: 'code', children: 'children' }"
          v-decorator="[
            'site',
            {
              rules: [{ required: true, message: '商品发货地不能为空' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="运费" v-bind="formItemLayout">
        <a-input-number
          :min="0"
          :max="300"
          v-decorator="[
            'cost',
            {
              rules: [{ required: true, message: '商品运费不能为空' }]
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
          @click="saveComponents"
          style="margin-left:20px;"
        >
          保存
        </a-button>
        <a-button
          type="primary"
          html-type="submit"
          @click="putComponents"
          style="margin-left:20px;"
        >
          保存并上架
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import FormItemLayout from "@/components/mixin/FormItemLayout";
import CommodityStep from "@/components/mixin/CommodityStep";
import { cityArrList } from "@/util/city";
export default {
  mixins: [FormItemLayout, CommodityStep],
  props: {
    defaultCommodity: Object
  },
  data() {
    return {
      bordered: false,
      cityArrList: cityArrList
    };
  },
  created() {
    this.form = this.$form.createForm(this, {
      mapPropsToFields: () => {
        return {
          site: this.$form.createFormField({
            value: this.defaultCommodity.site
          }),
          cost: this.$form.createFormField({
            value: this.defaultCommodity.cost
          })
        };
      }
    });
  }
};
</script>
