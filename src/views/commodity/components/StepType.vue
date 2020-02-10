<template>
  <a-card :bordered="bordered">
    <a-form>
      <a-form-item label="商品所属类别" v-bind="formItemLayout">
        <a-cascader
          :options="options"
          placeholder="请输入所属分类"
          v-model="defaultCommodity.type"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayoutWithOutLabel">
        <a-button type="primary" @click="nextStep">
          下一步
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import Type from "@/components/mixin/Type";
import FormItemLayoutfrom from "@/components/mixin/FormItemLayout";
export default {
  mixins: [Type, FormItemLayoutfrom],
  props: {
    defaultCommodity: Object
  },
  data() {
    return {
      bordered: false,
      options: []
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
    nextStep() {
      this.$emit("nextStep");
    }
  }
};
</script>
