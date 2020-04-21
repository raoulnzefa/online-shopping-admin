<template>
  <a-card :bordered="bordered">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="所属分类" v-bind="formItemLayout">
        <a-cascader
          :options="options"
          placeholder="请输入所属分类"
          v-decorator="[
            'type',
            {
              rules: [{ required: true, message: '请输入所属分类' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="品牌名称"
        v-bind="formItemLayout"
        :help="errorMessage"
        :validate-status="validateStatus"
      >
        <a-input
          v-decorator="[
            'name',
            {
              rules: [{ required: true, message: '请输入品牌名称' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="品牌图标" v-bind="formItemLayout">
        <a-upload
          :action="baseURL"
          listType="picture-card"
          :fileList="imageAddress"
          :remove="removeImage"
          @preview="handlePreview"
          @change="handleChange"
          ,
          v-decorator="[
            'imageAddress',
            {
              rules: [{ required: true, message: '请上传品牌图标' }]
            }
          ]"
        >
          <div v-if="imageAddress.length < 2">
            <a-icon type="plus" />
            <div class="ant-upload-text">上传图片</div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" @cancel="previewVisible = false">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
        <a-button type="primary" html-type="submit">
          提交
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { addBrand } from "@/api/brand";
import { baseURL } from "@/util/index";
import Type from "@/components/mixin/Type";
import FormItemLayout from "@/components/mixin/FormItemLayout";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  mixins: [Type, FormItemLayout],
  data() {
    return {
      bordered: false,
      form: this.$form.createForm(this),
      baseURL: baseURL + "/uploadbrandLogo",
      validateStatus: "",
      errorMessage: "",
      previewVisible: false,
      previewImage: "",
      imageAddress: [
        // {
        //   uid: "-1",
        //   name: "ceshi",
        //   path:
        //     "http://192.168.10.63:3000/upload/images/1575970105025-574d36dbN262ef26d.jpg"
        // }
      ],
      options: []
    };
  },
  methods: {
    disposeData() {
      var arr = [];
      const typeList = this.typeList;
      typeList.forEach(index => {
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
      this.options.forEach(obj => {
        obj.children = [];
        arr.forEach(index => {
          if (obj.value == index.lastName) {
            obj.children.push(index);
          }
        });
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          addBrand(values)
            .then(() => {
              this.$message.success("添加成功");
              this.validateStatus = "";
              this.errorMessage = "";
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.imageAddress = fileList;
    },
    removeImage(file) {
      console.log(file);
    }
  }
};
</script>
