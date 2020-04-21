<template>
  <a-card :bordered="bordered">
    <a-form :form="form">
      <a-form-item label="商品名称" v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'name',
            {
              rules: [{ required: true, message: '商品名称不能为空' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="商品标语" v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'title',
            {
              rules: [{ required: true, message: '商品标语不能为空' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="商品品牌" v-bind="formItemLayout">
        <a-select
          v-decorator="[
            'brand',
            {
              rules: [{ required: true, message: '商品品牌不能为空' }]
            }
          ]"
        >
          <a-select-option
            v-for="item in brandList"
            :value="item._id"
            :key="item._id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item label="商品图片" v-bind="formItemLayout">
        <a-upload
          :action="baseURL"
          listType="picture-card"
          @preview="handlePreview"
          @change="handleChange"
          :fileList="fileList"
          v-decorator="[
            'commidityImageList',
            {
              rules: [{ required: true, message: '请上传品牌图标' }]
            }
          ]"
        >
          <div>
            <a-icon type="plus" />
            <div class="ant-upload-text">上传图片</div>
          </div>
        </a-upload>
        <a-modal
          :visible="previewVisible"
          :footer="null"
          @cancel="handleCancel"
        >
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
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
import { baseURL } from "@/util/index";
import FormItemLayout from "@/components/mixin/FormItemLayout";
import CommodityStep from "@/components/mixin/CommodityStep";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  mixins: [FormItemLayout, CommodityStep],
  props: {
    defaultCommodity: Object
  },
  data() {
    return {
      bordered: false,
      brandList: [],
      baseURL: baseURL + "/uploadCommodityImage",
      previewVisible: false,
      previewImage: "",
      fileList: ""
    };
  },
  created() {
    this.getTypeBrandList(this.defaultCommodity.type);
    this.form = this.$form.createForm(this, {
      mapPropsToFields: () => {
        return {
          name: this.$form.createFormField({
            value: this.defaultCommodity.name
          }),
          title: this.$form.createFormField({
            value: this.defaultCommodity.title
          }),
          brand: this.$form.createFormField({
            value: this.defaultCommodity.brand
          }),
          commidityImageList: this.$form.createFormField({
            value: this.defaultCommodity.commidityImageList
          })
        };
      }
    });
    this.fileList = this.form.getFieldValue("commidityImageList");
    console.log(this.fileList);
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
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.form.commidityImageList = fileList;
    }
  }
};
</script>
