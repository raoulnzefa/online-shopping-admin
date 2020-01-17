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
              validateTrigger: ['blur'],
              rules: [
                { required: true, whitespace: true, message: '请输入参数名称' }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="属性值录入方式" v-bind="formItemLayout">
        <a-radio-group
          v-decorator="['enter', { initialValue: parameterDefault }]"
        >
          <a-radio value="0">手工录入</a-radio>
          <a-radio value="1">从下方添加后选择</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        v-for="(k, index) in form.getFieldValue('keys')"
        :key="k"
        v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
        :label="index === 0 ? '添加可选参数值' : ''"
        :required="false"
      >
        <a-input
          v-decorator="[
            `parameter[${k}]`,
            {
              validateTrigger: ['blur'],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: '请输入可选参数值'
                }
              ]
            }
          ]"
          style="width: 60%; margin-right: 8px"
        />
        <a-icon
          v-if="form.getFieldValue('keys').length > 1"
          class="dynamic-delete-button"
          type="minus-circle-o"
          :disabled="form.getFieldValue('keys').length === 1"
          @click="() => removeParameter(k)"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayoutWithOutLabel">
        <a-button type="dashed" style="width: 60%" @click="addParameter">
          <a-icon type="plus" />添加可选参数值
        </a-button>
      </a-form-item>
      <a-form-item label="是否开启参数" v-bind="formItemLayout">
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
import { addParameter } from "@/api/parameter";
let id = 0;
export default {
  data() {
    return {
      typeId: this.$route.params.id,
      bordered: false,
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
      formItemLayoutWithOutLabel: {
        labelCol: {
          xs: { span: 24 }
        },
        wrapperCol: {
          xs: { span: 10, offset: 7 }
        }
      },
      parameterDefault: "0",
      errorMessage: "",
      validateStatus: ""
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "form" });
    this.form.getFieldDecorator("keys", {
      initialValue: [],
      preserve: true
    });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(this.typeId);
          values.typeId = this.typeId;
          addParameter(values)
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
    removeParameter(k) {
      const { form } = this;
      const keys = form.getFieldValue("keys");
      if (keys.length === 1) {
        return;
      }
      form.setFieldsValue({
        keys: keys.filter(key => key !== k)
      });
    },

    addParameter() {
      const { form } = this;
      const keys = form.getFieldValue("keys");
      const nextKeys = keys.concat(id++);
      form.setFieldsValue({
        keys: nextKeys
      });
    }
  }
};
</script>
