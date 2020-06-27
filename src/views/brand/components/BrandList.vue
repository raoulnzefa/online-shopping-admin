<template>
  <a-card>
    <a-table :dataSource="brandList" :columns="columns" rowKey="_id" bordered>
      <template slot="imageAddress" slot-scope="text, record">
        <img :src="record.imageAddress" />
      </template>
      <template slot="type" slot-scope="text, record">
        <a-breadcrumb>
          <a-breadcrumb-item v-for="item in typeList" :key="item._id">
            <span v-if="item._id === record.type[0]">
              {{ item.name }}
            </span>
          </a-breadcrumb-item>
          <a-breadcrumb-item v-for="item in typeList" :key="item._id">
            <span v-if="item._id === record.type[1]">
              {{ item.name }}
            </span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </template>
      <template slot="operation" slot-scope="text, record">
        <router-link :to="{ name: 'brandupdate', params: { id: record._id } }"
          ><a-button type="primary">修改</a-button></router-link
        >
        <a-button
          type="danger"
          @click="removeBrand(record._id)"
          style="margin-left:20px"
          >删除</a-button
        >
      </template>
    </a-table>
  </a-card>
</template>

<script>
import { getBrandList, removeBrand } from "@/api/brand";
import Type from "@/components/mixin/Type";
const columns = [
  {
    title: "品牌名称",
    dataIndex: "name"
  },
  {
    title: "品牌图标",
    dataIndex: "imageAddress",
    scopedSlots: { customRender: "imageAddress" }
  },
  {
    title: "所属分类",
    dataIndex: "type",
    scopedSlots: { customRender: "type" }
  },
  {
    title: "创建时间",
    dataIndex: "createTime"
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];
export default {
  mixins: [Type],
  data() {
    return {
      brandList: [],
      columns: columns
    };
  },
  created() {
    this.getBrandList();
  },
  methods: {
    getBrandList() {
      getBrandList()
        .then(res => {
          this.brandList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    removeBrand(id) {
      const _this = this;
      removeBrand(id)
        .then(() => {
          _this.brandList = _this.brandList.filter(index => {
            return index._id !== id;
          });
          console.log(_this.brandList);
          _this.$msssage.success("删除成功");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
