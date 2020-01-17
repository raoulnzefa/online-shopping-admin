export default {
  data() {
    return {
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
      formItemLayoutWithOutLabel: {
        labelCol: {
          xs: { span: 24 }
        },
        wrapperCol: {
          xs: { span: 10, offset: 7 }
        }
      }
    };
  }
};
