<template>
  <a-card>
    <a-table :dataSource="brandList" :columns="columns" rowKey="_id" bordered>
      <template slot="imageAddress" slot-scope="text, record">
        <img :src="record.imageAddress" />
      </template>
      <template slot="type" slot-scope="text, record">
        <a-breadcrumb>
          <a-breadcrumb-item v-for="item in shopTypeList" :key="item._id">
            <span v-if="item._id === record.type[0]">
              {{ item.name }}
            </span>
          </a-breadcrumb-item>
          <a-breadcrumb-item v-for="item in shopTypeList" :key="item._id">
            <span v-if="item._id === record.type[1]">
              {{ item.name }}
            </span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </template>
    </a-table>
  </a-card>
</template>

<script>
import { getBrandList } from "@/api/brand";
import { getAllShopTypeList } from "@/api/shop_type";
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
  }
];
export default {
  data() {
    return {
      shopTypeList: [],
      brandList: [],
      columns: columns
    };
  },
  created() {
    this.getAllShopTypeList();
    this.getBrandList();
  },
  methods: {
    getAllShopTypeList() {
      getAllShopTypeList().then(res => {
        this.shopTypeList = res.data;
      });
    },
    getBrandList() {
      getBrandList()
        .then(res => {
          this.brandList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
