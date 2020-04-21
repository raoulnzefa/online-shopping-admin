<template>
  <a-card :bordered="bordered">
    <a-form :form="form">
      <a-form-item
        v-for="(item, k) in attributeList"
        :key="item._id"
        :label="item.name"
        v-bind="formItemLayout"
      >
        <a-radio-group
          :options="item.attribute"
          v-if="item.multiple === false && item.enter === '1'"
          v-decorator="[
            `attributeList[${k}]`,
            {
              rules: [{ required: true, message: '商品属性不能为空' }]
            }
          ]"
        />
        <a-checkbox-group
          :options="item.attribute"
          v-if="item.multiple === true && item.enter === '1'"
          v-decorator="[
            `attributeList[${k}]`,
            {
              rules: [{ required: true, message: '商品属性不能为空' }]
            }
          ]"
        />
        <a-input
          v-if="item.enter === '0'"
          v-decorator="[
            `attributeList[${k}]`,
            {
              rules: [{ required: true, message: '商品属性不能为空' }]
            }
          ]"
        />
        <a-input v-if="item.news === true" v-model="addContent[k]" />
        <a-button v-if="item.news === true" @click="addAttribute(item, k)"
          >新增</a-button
        >
      </a-form-item>
      <a-form-item>
        <a-table
          :dataSource="defaultCommodity.attributeTableList"
          :columns="columns"
          bordered
          rowKey="_id"
        >
          <template
            v-for="col in ['price', 'repertory', 'repertoryWarn', 'skuNo']"
            :slot="col"
            slot-scope="text, record"
          >
            <div :key="col">
              <a-input
                :value="text"
                style="width:100px"
                @change="e => handleChange(e.target.value, record._id, col)"
              />
            </div>
          </template>
          <template slot="operation" slot-scope="text, record">
            <a-popconfirm
              v-if="defaultCommodity.attributeTableList.length"
              title="确认删除?"
              @confirm="() => onDelete(record._id)"
            >
              <a href="javascript:;">删除</a>
            </a-popconfirm>
          </template>
        </a-table>
      </a-form-item>
      <a-form-item v-bind="formItemLayoutWithOutLabel">
        <a-button type="primary" @click="prevStep">
          上一步
        </a-button>
        <a-button type="primary" @click="nextStep" style="margin-left:20px;">
          下一步
        </a-button>
        <a-button
          type="primary"
          @click="createAttributeTab"
          style="margin-left:20px;"
          >同步</a-button
        >
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { getTypeAttributeList } from "@/api/attribute";
import FormItemLayout from "@/components/mixin/FormItemLayout";
import CommodityStep from "@/components/mixin/CommodityStep";
const columns = [
  {
    title: "销售价格",
    dataIndex: "price",
    scopedSlots: { customRender: "price" }
  },
  {
    title: "商品库存",
    dataIndex: "repertory",
    scopedSlots: { customRender: "repertory" }
  },
  {
    title: "库存预警值",
    dataIndex: "repertoryWarn",
    scopedSlots: { customRender: "repertoryWarn" }
  },
  {
    title: "SKU编号",
    dataIndex: "skuNo",
    scopedSlots: { customRender: "skuNo" }
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];
const attributeField = {
  price: "",
  repertory: "",
  repertoryWarn: "",
  skuNo: ""
};
export default {
  mixins: [FormItemLayout, CommodityStep],
  props: {
    defaultCommodity: Object
  },
  data() {
    return {
      bordered: false,
      attributeList: [],
      columns: [],
      defaultColumns: columns,
      addContent: []
    };
  },
  created() {
    const attributeList = {};
    const data = this.defaultCommodity.attributeList;
    this.getTypeAttributeList(this.defaultCommodity.type[0]);
    this.form = this.$form.createForm(this, {
      mapPropsToFields: () => {
        data.forEach((index, key) => {
          attributeList[`attributeList[${key}]`] = this.$form.createFormField({
            value: index
          });
        });
        return attributeList;
      }
    });
  },
  methods: {
    getTypeAttributeList(typeId) {
      getTypeAttributeList(typeId).then(res => {
        this.attributeList = res.data;
        this.column();
      });
    },
    column() {
      this.columns = [...this.defaultColumns];
      this.attributeList.forEach(index => {
        var obj = {};
        obj.title = index.name;
        obj.dataIndex = index.key;
        this.columns.unshift(obj);
      });
    },
    onDelete(key) {
      const dataSource = [...this.defaultCommodity.attributeTableList];
      this.defaultCommodity.attributeTableList = dataSource.filter(
        item => item._id !== key
      );
    },
    addAttribute(item, k) {
      const _this = this;
      const repetition = item.attribute.filter(index => {
        return index === _this.addContent[k];
      });
      if (repetition.length === 0 && this.addContent[k] !== undefined) {
        item.attribute.push(this.addContent[k]);
      }
    },
    // 笛卡尔积
    // 目前最多支持4个
    corssJoin(attributeList) {
      return attributeList
        .reduce((a, b) => {
          let m = a.map(av => b.map(bv => [bv].concat(av)));
          return m.reduce((c, d) => c.concat(d), []);
        })
        .map(v => v.reverse());
    },
    // 生成SKU表格
    createAttributeTab() {
      const attributeList = this.attributeList;
      console.log(attributeList);
      const attributeTabList = this.corssJoin(
        this.form.getFieldValue("attributeList")
      );
      console.log(attributeTabList);
      const attributeNewTabList = [];
      let _id = 0;
      attributeTabList.forEach(arr => {
        const obj = {};
        obj["_id"] = _id;
        obj["attributeArr"] = arr;
        arr.forEach((value, index) => {
          obj[attributeList[index].key] = value;
        });
        _id++;
        Object.assign(obj, attributeField);
        attributeNewTabList.push(obj);
      });
      this.defaultCommodity.attributeTableList = attributeNewTabList;
    },
    handleChange(value, id, column) {
      const newData = [...this.defaultCommodity.attributeTableList];
      const target = newData.filter(item => id === item._id)[0];
      if (target) {
        target[column] = value;
        this.defaultCommodity.attributeTableList = newData;
      }
    }
  }
};
</script>
