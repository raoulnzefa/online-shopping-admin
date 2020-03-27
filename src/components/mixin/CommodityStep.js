export default {
  methods: {
    nextStep() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit("nextStep", values);
        }
      });
    },
    prevStep() {
      this.$emit("prevStep");
    },
    putComponents() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit("putComponents", values);
        }
      });
    },
    saveComponents() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit("saveComponents", values);
        }
      });
    }
  }
};
