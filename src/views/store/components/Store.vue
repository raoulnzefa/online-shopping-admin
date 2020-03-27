<template>
  <a-card :bordered="bordered">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="所属分类" v-bind="formItemLayout">
        <a-cascader
          :options="options"
          placeholder="请输入所属分类"
          v-decorator="[
            'type',
            {
              rules: [{ required: true, message: '请输入所属分类' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="店铺名称" v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'name',
            {
              rules: [{ required: true, message: '请输入店铺名称' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="店铺状态" v-bind="formItemLayout">
        <a-select
          v-decorator="[
            'status',
            {
              rules: [{ required: true, message: '请输入店铺状态' }]
            }
          ]"
        >
          <a-select-option
            v-for="item in statusList"
            :value="item.value"
            :key="item.value"
            >{{ item.name }}</a-select-option
          >
        </a-select>
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
import Type from "@/components/mixin/Type";
import FormItemLayout from "@/components/mixin/FormItemLayout";
import { addStore } from "@/api/store";
const statusList = [
  { name: "正常", value: "0" },
  { name: "关闭", value: "1" },
  { name: "暂停营业", value: "2" }
];
export default {
  mixins: [Type, FormItemLayout],
  data() {
    return {
      bordered: false,
      form: this.$form.createForm(this),
      errorMessage: "",
      validateStatus: "",
      options: [],
      statusList: statusList
    };
  },
  methods: {
    disposeData() {
      var arr = [];
      const typeList = this.typeList;
      typeList.forEach(index => {
        var obj = {
          label: index.name,
          value: index._id,
          lastName: index.lastName
        };
        if (index.lastName == "-1") {
          this.options.push(obj);
        } else {
          arr.push(obj);
        }
      });
      this.options.forEach(obj => {
        obj.children = [];
        arr.forEach(index => {
          if (obj.value == index.lastName) {
            obj.children.push(index);
          }
        });
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          addStore(values)
            .then(() => {
              this.$message.success("添加成功");
              this.validateStatus = "";
              this.errorMessage = "";
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  }
};
</script>
