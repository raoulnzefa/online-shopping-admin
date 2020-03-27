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
                {
                  required: true,
                  whitespace: true,
                  message: '请输入属性名称'
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="属性Key" v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'key',
            {
              validateTrigger: ['blur'],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: '请输入属性Key'
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="属性值录入方式" v-bind="formItemLayout">
        <a-radio-group
          v-decorator="['enter', { initialValue: attributeDefault }]"
        >
          <a-radio value="0">手工录入</a-radio>
          <a-radio value="1">从下方添加后选择</a-radio>
        </a-radio-group>
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
      <a-form-item
        v-bind="formItemLayoutWithOutLabel"
        v-if="form.getFieldValue('enter') === '1'"
      >
        <a-button type="dashed" style="width: 60%" @click="addAttribute">
          <a-icon type="plus" />添加可选属性值
        </a-button>
      </a-form-item>
      <a-form-item label="是否支持多选" v-bind="formItemLayout">
        <a-switch
          v-decorator="[
            'multiple',
            { valuePropName: 'checked', initialValue: false }
          ]"
        />
      </a-form-item>
      <a-form-item label="是否开启属性" v-bind="formItemLayout">
        <a-switch
          v-decorator="[
            'status',
            { valuePropName: 'checked', initialValue: true }
          ]"
        />
      </a-form-item>
      <a-form-item label="是否支持新增" v-bind="formItemLayout">
        <a-switch
          v-decorator="[
            'news',
            { valuePropName: 'checked', initialValue: false }
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
import { addAttribute, updateAttriubte, getAttribute } from "@/api/attribute";
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
      attributeDefault: "0",
      errorMessage: "",
      validateStatus: "",
      attributeValueId: ""
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "form" });
    this.form.getFieldDecorator("keys", {
      initialValue: [],
      preserve: true
    });
  },
  created() {
    const typeId = this.typeId;
    this.form.getFieldDecorator("typeId", {
      initialValue: typeId,
      preserve: true
    });
    if (this.isEdit) {
      this.id = this.$route.params.id;
      this.form.getFieldDecorator("id", {
        initialValue: "",
        preserve: true
      });
      this.getAttribute();
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.isEdit) {
            this.updateAttriubtes(values);
          } else {
            this.addAttributes(values);
          }
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
    },
    addAttributes(values) {
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
    },
    updateAttriubtes(values) {
      values.id = this.id;
      values.attributeValueId = this.attributeValueId;
      updateAttriubte(values)
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
    getAttribute() {
      getAttribute(this.id)
        .then(res => {
          const data = res.data;
          this.attributeValueId = data.attributeValueId;
          id = data.attribute.length;
          let arr = [];
          for (let i = 0; i < data.attribute.length; i++) {
            arr.push(i);
            this.form.getFieldValue(`attribute[${i}]`);
          }
          this.form.setFieldsValue({
            typeId: data.typeId,
            id: data._id,
            name: data.name,
            key: data.key,
            keys: arr,
            attribute: data.attribute,
            status: data.status,
            enter: data.enter,
            multiple: data.multiple,
            news: data.news
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
