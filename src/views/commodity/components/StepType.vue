<template>
  <a-card :bordered="bordered">
    <a-form :form="form">
      <a-cascader :options="options" placeholder="请输入所属分类" />
    </a-form>
  </a-card>
</template>

<script>
import Type from "@/components/mixin/Type";
import FormItemLayout from "@/components/mixin/FormItemLayout";
export default {
  mixins: [Type, FormItemLayout],
  data() {
    return {
      bordered: false,
      form: this.$form.createForm(this),
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
    }
  }
};
</script>
