import { getAllShopTypeList } from "@/api/shop_type";

export default {
  data() {
    return {
      typeList: []
    };
  },
  created() {
    this.getTypeList();
  },
  methods: {
    getTypeList() {
      getAllShopTypeList()
        .then(res => {
          this.typeList = res.data;
          if (this.disposeData) {
            this.disposeData();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
