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
          list-type="picture-card"
          :file-list="imageAddress"
          :remove="removeBrandPic"
          @preview="handlePreview"
          @change="handleChange"
          v-decorator="[
            'imageAddress',
            {
              rules: [{ required: true, message: '请上传品牌图标' }]
            }
          ]"
        >
          <div v-if="imageAddress.length < 2">
            <a-icon type="plus" />
            <div class="ant-upload-text">
              Upload
            </div>
          </div>
        </a-upload>
        <a-modal
          :visible="previewVisible"
          :footer="null"
          @cancel="previewVisible = false"
        >
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
import { addBrand, getBrand, editBrand, removeBrandPic } from "@/api/brand";
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
  props: {
    isEdit: Boolean
  },
  data() {
    return {
      id: "",
      bordered: false,
      form: this.$form.createForm(this),
      baseURL: baseURL + "/uploadbrandLogo",
      validateStatus: "",
      errorMessage: "",
      previewVisible: false,
      previewImage: "",
      imageAddress: [],
      options: []
    };
  },
  created() {
    if (this.isEdit) {
      this.id = this.$route.params.id;
      this.getBrand();
    }
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
    getBrand() {
      getBrand(this.id).then(res => {
        const data = res.data;
        this.form.setFieldsValue({
          type: data.type,
          name: data.name,
          imageAddress: data.imageAddress
        });
        this.imageAddress = data.imageAddress;
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.isEdit) {
            values.id = this.id;
            this.editBrand(values);
          } else {
            this.addBrand(values);
          }
        }
      });
    },
    addBrand(values) {
      addBrand(values)
        .then(() => {
          this.$message.success("添加成功");
          this.validateStatus = "";
          this.errorMessage = "";
        })
        .catch(err => {
          this.errorMessage = err;
          this.validateStatus = "error";
        });
    },
    editBrand(values) {
      editBrand(values)
        .then(() => {
          this.$message.success("修改成功");
          this.validateStatus = "";
          this.errorMessage = "";
        })
        .catch(err => {
          this.errorMessage = err;
          this.validateStatus = "error";
        });
    },
    removeBrandPic(file) {
      file.isEdit = this.isEdit;
      removeBrandPic(file)
        .then(() => {})
        .catch(() => {});
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
    }
  }
};
</script>
