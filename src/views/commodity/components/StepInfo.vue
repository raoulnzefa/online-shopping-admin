<template>
  <a-card :bordered="bordered">
    <a-form :form="form">
      <a-form-item label="商品名称" v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'name',
            {
              rules: [{ required: true, message: '商品名称不能为空' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="商品标语" v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'title',
            {
              rules: [{ required: true, message: '商品标语不能为空' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="商品品牌" v-bind="formItemLayout">
        <a-select
          v-decorator="[
            'brand',
            {
              rules: [{ required: true, message: '商品品牌不能为空' }]
            }
          ]"
        >
          <a-select-option
            v-for="item in brandList"
            :value="item._id"
            :key="item._id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
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
import { getTypeBrandList } from "@/api/brand";
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
      brandList: []
    };
  },
  created() {
    this.getTypeBrandList(this.defaultCommodity.type);
    this.form = this.$form.createForm(this, {
      mapPropsToFields: () => {
        return {
          name: this.$form.createFormField({
            value: this.defaultCommodity.name
          }),
          title: this.$form.createFormField({
            value: this.defaultCommodity.title
          }),
          brand: this.$form.createFormField({
            value: this.defaultCommodity.brand
          })
        };
      }
    });
  },
  methods: {
    getTypeBrandList(typeId) {
      getTypeBrandList(typeId)
        .then(res => {
          this.brandList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
