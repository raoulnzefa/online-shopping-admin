<template>
  <a-card :bordered="bordered">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item
        label="类型名称"
        v-bind="formItemLayout"
        :help="errorMessage"
        :validate-status="validateStatus"
      >
        <a-input
          v-decorator="[
            'name',
            {
              rules: [{ required: true, message: '请输入类型名称' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="上级分类" v-bind="formItemLayout">
        <a-select v-decorator="['lastName', { initialValue: defaultType._id }]">
          <a-select-option
            v-for="item in typeList"
            :key="item._id"
            :value="item._id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item label="类型状态" v-bind="formItemLayout">
        <a-switch
          defaultChecked
          v-decorator="['status', { initialValue: true }]"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
        <a-button type="primary" html-type="submit">
          提交
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { addShopType } from "@/api/shop_type";
import Type from "@/components/mixin/Type";
import FormItemLayout from "@/components/mixin/FormItemLayout";
export default {
  mixins: [Type, FormItemLayout],
  data() {
    return {
      bordered: false,
      form: this.$form.createForm(this),
      errorMessage: "",
      validateStatus: "",
      defaultType: { _id: "-1", name: "无上级分类" }
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          addShopType(values)
            .then(() => {
              this.$message.success("添加成功");
              this.validateStatus = "";
              this.errorMessage = "";
            })
            .catch(error => {
              this.validateStatus = "error";
              this.errorMessage = error;
            });
        }
      });
    },
    disposeData() {
      this.typeList = this.typeList.filter(function(index) {
        return index.lastName === "-1";
      });
      this.typeList.unshift(this.defaultType);
    }
  }
};
</script>
