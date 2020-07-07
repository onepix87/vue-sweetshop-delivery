<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item
      :validate-status="userNameError() ? 'error' : ''"
      :help="userNameError() || ''"
    >
      <a-input
        v-decorator="[
          'email',
          {
            rules: [{ required: true, message: 'Введите email!' }]
          }
        ]"
        placeholder="Username"
      >
        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <a-form-item
      :validate-status="passwordError() ? 'error' : ''"
      :help="passwordError() || ''"
    >
      <a-input
        v-decorator="[
          'password',
          {
            rules: [{ required: true, message: 'Введите пароль!' }]
          }
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        :loading="loading"
        :disabled="hasErrors(form.getFieldsError())"
      >
        Войти
      </a-button>

      <div v-if="authError" class="login-form__error">
        {{ authError }}
      </div>

      <div>
        Еще нет аккаунта?
        <a @click="go('Registration')" class="login-form__link"
          >Зарегестрироваться!</a
        >
      </div>
    </a-form-item>
  </a-form>
</template>

<script>
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this, { name: "horizontal_login" })
    };
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
  },
  computed: {
    loading() {
      return this.$store.getters.isLoading;
    },
    authError() {
      return this.$store.getters.getAuthError;
    }
  },
  methods: {
    go(routeName) {
      this.$router.push({ name: routeName });
      this.$store.commit("setOpenPopup", false);
    },
    // Only show error after a field is touched.
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("userName") && getFieldError("userName");
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("password") && getFieldError("password");
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.commit("setLoading", true);
          this.$store
            .dispatch("signUp", values)
            .then(() => {
              this.$store.commit("setOpenPopup", false);
            })
            .catch(data => {
              console.log("auth error loginform", data);
            })
            .finally(() => {
              this.$store.commit("setLoading", false);
            });
        }
      });
    }
  }
};
</script>
<style lang="scss">
@import "src/styles";
.login-form__link {
  color: $main-color;
  text-decoration: underline;
  cursor: pointer;
}

.login-form__error {
  color: $main-error;
}
</style>
