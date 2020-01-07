<template>
  <a-card>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item
        label="参数名称"
        v-bind="formItemLayout"
        :help="errorMessage"
        :validate-status="validateStatus"
      >
        <a-input
          v-decorator="[
            'name',
            {
              rules: [{ required: true, message: '请输入参数名称' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="参数可选值" v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'name',
            {
              rules: [{ required: true, message: '请输入参数可选值' }]
            }
          ]"
        />
        <a-button type="primary">添加</a-button>
      </a-form-item>
      <a-form-item label="是否支持多选" v-bind="formItemLayout">
        <a-switch defaultChecked @change="onChange" v-decorator="['name']" />
      </a-form-item>
      <a-form-item label="是否支持新增" v-bind="formItemLayout">
        <a-switch defaultChecked @change="onChange" v-decorator="['name']" />
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
      validateStatus: ""
    };
  },
  methods: {
    handleSubmit() {}
  }
};
</script>
