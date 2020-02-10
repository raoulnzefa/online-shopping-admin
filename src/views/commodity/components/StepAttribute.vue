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
          v-if="item.multiple === true"
        />
        <a-checkbox-group
          v-model="defaultCommodity.attributeList[index].value"
          :options="item.attribute"
          v-else
        />
        <!-- <a-input type="text" v-model="addContent" /><a-button
            v-if="item.news === true"
            @click="add(item.attribute)"
            >新增</a-button
          > -->
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
import { getAttributeList } from "@/api/attribute";
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
    this.getAttributeList();
  },
  methods: {
    getAttributeList() {
      getAttributeList().then(res => {
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
