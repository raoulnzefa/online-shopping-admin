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
      <a-form-item label="参数值录入方式" v-bind="formItemLayout">
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
      <a-form-item
        v-bind="formItemLayoutWithOutLabel"
        v-if="form.getFieldValue('enter') === '1'"
      >
        <a-button type="dashed" style="width: 60%" @click="addParameter">
          <a-icon type="plus" />添加可选参数值
        </a-button>
      </a-form-item>
      <a-form-item label="是否开启参数" v-bind="formItemLayout">
        <a-switch
          v-decorator="[
            'status',
            { valuePropName: 'checked', initialValue: true }
          ]"
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
import { addParameter, updateParameter, getParameter } from "@/api/parameter";
import FormItemLayout from "@/components/mixin/FormItemLayout";
let id = 0;
export default {
  mixins: [FormItemLayout],
  props: {
    isEdit: Boolean
  },
  data() {
    return {
      typeId: this.$route.params.typeId,
      id: "",
      bordered: false,
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
    const typeId = this.typeId;
    this.form.getFieldDecorator("typeId", {
      initialValue: typeId,
      preserve: true
    });
  },
  created() {
    if (this.isEdit) {
      this.id = this.$route.params.id;
      this.form.getFieldDecorator("id", {
        initialValue: "",
        preserve: true
      });
      this.getParameter();
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.isEdit) {
            this.updateParameter(values);
          } else {
            this.addParamecters(values);
          }
        }
      });
    },
    addParamecters(values) {
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
    },
    updateParameter(values) {
      values.id = this.id;
      updateParameter(values)
        .then(() => {
          this.$message.success("修改成功");
          this.validateStatus = "";
          this.errorMessage = "";
        })
        .catch(error => {
          this.validateStatus = "error";
          this.errorMessage = error;
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
    },
    getParameter() {
      getParameter(this.id)
        .then(res => {
          const data = res.data[0];
          id = data.parameter.length;
          let arr = [];
          for (let i = 0; i < data.parameter.length; i++) {
            arr.push(i);
            this.form.getFieldValue(`parameter[${i}]`);
          }
          this.form.setFieldsValue({
            typeId: data.typeId,
            id: data._id,
            name: data.name,
            keys: arr,
            parameter: data.parameter,
            status: data.status,
            enter: data.enter
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
