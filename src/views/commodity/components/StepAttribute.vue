<template>
  <a-card :bordered="bordered">
    <a-form>
      <a-form-item
        v-for="(item, index) in attributeList"
        :key="item._id"
        :label="item.name"
        v-bind="formItemLayout"
      >
        <a-radio-group
          v-model="defaultCommodity.attributeList[index].value"
          :options="item.attribute"
          v-if="item.multiple === false && item.enter === '1'"
        />
        <a-checkbox-group
          v-model="defaultCommodity.attributeList[index].value"
          :options="item.attribute"
          v-if="item.multiple === true && item.enter === '1'"
        />
        <a-input
          v-model="defaultCommodity.attributeList[index].value"
          v-if="item.enter === '0'"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayoutWithOutLabel">
        <a-button type="primary" @click="prevStep">
          上一步
        </a-button>
        <a-button type="primary" @click="nextStep" style="margin-left:20px;">
          下一步
        </a-button>
      </a-form-item>
      <!-- <a-table
        :dataSource="attributeList"
        :columns="columns"
        bordered
      ></a-table> -->
    </a-form>
  </a-card>
</template>

<script>
import { getTypeAttributeList } from "@/api/attribute";
import FormItemLayout from "@/components/mixin/FormItemLayout";
const columns = [
  {
    title: "参数名称",
    dataIndex: "name"
  }
];
export default {
  mixins: [FormItemLayout],
  props: {
    defaultCommodity: Object
  },
  data() {
    return {
      bordered: false,
      attributeList: [],
      columns: columns,
      addContent: ""
    };
  },
  created() {
    this.getTypeAttributeList(this.defaultCommodity.type[0]);
  },
  methods: {
    getTypeAttributeList(typeId) {
      getTypeAttributeList(typeId).then(res => {
        this.attributeList = res.data;
      });
    },
    nextStep() {
      this.$emit("nextStep");
    },
    prevStep() {
      this.$emit("prevStep");
    },
    add(arr) {
      arr.push(this.addContent);
    }
  }
};
</script>
