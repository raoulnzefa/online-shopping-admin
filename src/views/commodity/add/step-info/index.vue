<template>
  <a-card :bordered="bordered">
    <a-form :form="form">
      <a-form-item label="商品名称" v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'commodityName',
            {
              rules: [{ required: true, message: '请输入商品名称' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="商品数量" v-bind="formItemLayout">
        <a-input-number :min="1" :max="9999" />
      </a-form-item>
      <a-form-item label="商品介绍" v-bind="formItemLayout">
        <a-textarea :rows="4" />
      </a-form-item>
      <a-form-item label="商品价格" v-bind="formItemLayout">
        <a-input-number :min="0" />
      </a-form-item>
      <a-form-item label="商品图片" v-bind="formItemLayout">
        <a-upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          :fileList="imgagefileList"
          :remove="remove"
          @preview="handlePreview"
          @change="handleChange"
        >
          <div v-if="imgagefileList.length < 10">
            <a-icon type="plus" />
            <div class="ant-upload-text">上传图片</div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" @cancel="previewVisible = false">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-form-item>
      <a-form-item label="商品视频" v-bind="formItemLayout"></a-form-item>
    </a-form>
  </a-card>
</template>

<script>
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
      previewVisible: false,
      previewImage: "",
      imgagefileList: []
    };
  },
  methods: {
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.imgagefileList = fileList;
    },
    remove(file) {
      console.log(file);
    }
  }
};
</script>
