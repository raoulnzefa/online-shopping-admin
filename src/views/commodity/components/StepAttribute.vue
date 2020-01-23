<template>
  <a-card>
    <a-form :form="attributeList">
      <a-form-item
        v-for="item in attributeList"
        :key="item._id"
        :label="item.name"
        v-bind="formItemLayout"
      >
        <a-radio-group :options="item.attribute" />
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { getAttributeList } from "@/api/attribute";
import FormItemLayout from "@/components/mixin/FormItemLayout";
export default {
  mixins: [FormItemLayout],
  data() {
    return {
      attributeList: []
    };
  },
  created() {
    this.getAttributeList();
  },
  methods: {
    getAttributeList() {
      getAttributeList().then(res => {
        this.attributeList = res.data;
      });
    }
  }
};
</script>
