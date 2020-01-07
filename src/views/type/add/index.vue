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
import { addShopType, getAllShopTypeList } from "@/api/shop_type";
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
      errorMessage: "",
      validateStatus: "",
      typeList: [],
      defaultType: { _id: "-1", name: "无上级分类" }
    };
  },
  created() {
    this.getTypeList();
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
    getTypeList() {
      const _this = this;
      getAllShopTypeList()
        .then(res => {
          res.data.forEach(index => {
            if (index.status === true && index.lastName === "-1") {
              _this.typeList.push(index);
            }
          });
          _this.typeList.unshift(this.defaultType);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
