<template>
  <a-card :bordered="bordered">
    <a-form>
      <a-form-item label="商品名称" v-bind="formItemLayout">
        <a-input v-model="defaultCommodity.name" />
      </a-form-item>
      <a-form-item label="商品标语" v-bind="formItemLayout">
        <a-input v-model="defaultCommodity.title" />
      </a-form-item>
      <a-form-item label="商品品牌" v-bind="formItemLayout">
        <a-select v-model="defaultCommodity.brand">
          <a-select-option
            v-for="item in brandList"
            :value="item._id"
            :key="item._id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item v-bind="formItemLayoutWithOutLabel">
        <a-button type="primary" html-type="submit" @click="prevStep">
          上一步
        </a-button>
        <a-button
          type="primary"
          html-type="submit"
          @click="nextStep"
          style="margin-left:20px;"
        >
          下一步
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { getTypeBrandList } from "@/api/brand";
import FormItemLayout from "@/components/mixin/FormItemLayout";
export default {
  mixins: [FormItemLayout],
  props: {
    defaultCommodity: Object
  },
  data() {
    return {
      bordered: false,
      brandList: []
    };
  },
  created() {
    this.getTypeBrandList(this.defaultCommodity.type);
  },
  methods: {
    getTypeBrandList(typeId) {
      getTypeBrandList(typeId)
        .then(res => {
          this.brandList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    nextStep() {
      this.$emit("nextStep");
    },
    prevStep() {
      this.$emit("prevStep");
    }
  }
};
</script>
