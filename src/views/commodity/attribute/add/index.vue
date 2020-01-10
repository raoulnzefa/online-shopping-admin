<template>
  <a-card>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item
        label="属性名称"
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
                { required: true, whitespace: true, message: '请输入属性名称' }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        v-for="(k, index) in form.getFieldValue('keys')"
        :key="k"
        v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
        :label="index === 0 ? '添加可选属性值' : ''"
        :required="false"
      >
        <a-input
          v-decorator="[
            `attribute[${k}]`,
            {
              validateTrigger: ['blur'],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: '请输入可选属性值'
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
          @click="() => removeAttribute(k)"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayoutWithOutLabel">
        <a-button type="dashed" style="width: 60%" @click="addAttribute">
          <a-icon type="plus" />添加可选属性值
        </a-button>
      </a-form-item>
      <a-form-item label="是否开启属性" v-bind="formItemLayout">
        <a-switch
          defaultChecked
          v-decorator="['status', { initialValue: true }]"
        />
      </a-form-item>
      <a-form-item label="是否支持多选" v-bind="formItemLayout">
        <a-switch v-decorator="['multiple', { initialValue: false }]" />
      </a-form-item>
      <a-form-item label="是否支持新增" v-bind="formItemLayout">
        <a-switch v-decorator="['news', { initialValue: false }]" />
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
import { addAttribute } from "@/api/attribute";
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
          addAttribute(values)
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
    removeAttribute(k) {
      const { form } = this;
      const keys = form.getFieldValue("keys");
      if (keys.length === 1) {
        return;
      }
      form.setFieldsValue({
        keys: keys.filter(key => key !== k)
      });
    },

    addAttribute() {
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
