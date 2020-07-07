<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      title="Авторизация"
      :visible="visible"
      :footer="null"
    >
      <LoginForm />
    </a-modal>
  </div>
</template>
<script>
import LoginForm from "./LoginForm";
export default {
  name: "LoginPopup",
  components: {
    LoginForm
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleCancel(e) {
      console.log("Clicked cancel button", e);
      this.$store.commit("setOpenPopup", false);
    }
  }
};
</script>
