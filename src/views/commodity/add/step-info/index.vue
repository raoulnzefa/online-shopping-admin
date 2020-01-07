<template>
  <a-card :bordered="bordered">
    <a-form :form="form">
      <a-form-item label="商品名称" v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'name',
            {
              rules: [{ required: true, message: '请输入商品名称' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="商品标语" v-bind="formItemLayout">
        <a-input v-decorator="['title']" />
      </a-form-item>
      <a-form-item label="商品品牌" v-bind="formItemLayout">
        <a-select
          v-decorator="[
            'brand',
            {
              rules: [{ required: true, message: '请输入商品品牌' }]
            }
          ]"
        >
          <a-select-option
            v-for="item in brandList"
            :value="item._vid"
            :key="item._vid"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { getBrandList } from "@/api/brand";
export default {
  data() {
    return {
      bordered: false,
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
          md: { span: 10 }
        }
      },
      brandList: []
    };
  },
  created() {
    this.getBrandList();
  },
  methods: {
    getBrandList() {
      getBrandList()
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
