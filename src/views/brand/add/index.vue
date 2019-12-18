<template>
  <a-card :bordered="bordered">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="所属分类" v-bind="formItemLayout">
        <a-cascader
          :options="options"
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
          action="http://192.168.137.1:3000/uploadbrandLogo"
          listType="picture-card"
          :fileList="imageAddress"
          :remove="remove"
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
import { getAllShopTypeList } from "@/api/shop_type";
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
  created() {
    this.getAllShopTypeList();
  },
  methods: {
    getAllShopTypeList() {
      getAllShopTypeList()
        .then(res => {
          this.dataJoint(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    dataJoint(data) {
      var arr = [];
      data.forEach(index => {
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
      const _this = this;
      arr.forEach(index => {
        _this.options.forEach(obj => {
          if (obj.value == index.lastName) {
            obj.children = [];
            obj.children.push(index);
          }
        });
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          addBrand(values)
            .then(() => {
              this.$message.success("添加成功");
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.imageAddress = fileList;
    },
    remove(file) {
      console.log(file);
    }
  }
};
</script>
