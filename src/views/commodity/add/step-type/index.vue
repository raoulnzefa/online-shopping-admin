<template>
  <a-card :bordered="bordered">
    <a-form :form="form">
      <a-cascader :options="options" placeholder="请输入所属分类" />
    </a-form>
  </a-card>
</template>

<script>
import { getAllShopTypeList } from "@/api/shop_type";
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
      options: []
    };
  },
  created() {
    this.getAllShopTypeList();
  },
  methods: {
    getAllShopTypeList() {
      getAllShopTypeList()
        .then(res => {
          this.dataJoint(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    dataJoint(data) {
      var arr = [];
      data.forEach(index => {
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
      const _this = this;
      arr.forEach(index => {
        _this.options.forEach(obj => {
          if (obj.value == index.lastName) {
            obj.children = [];
            obj.children.push(index);
          }
        });
      });
    }
  }
};
</script>
