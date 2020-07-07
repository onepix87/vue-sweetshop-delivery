<template>
  <div class="cart-actions">
    <h2>Общая сумма заказа:</h2>
    <div id="fullPrice" class="cart-actions__price">{{ getFullPrice }} ₽</div>

    <a-button id="createOrder" type="primary" html-type="button" @click="createOrder">
      Оформить заказ
    </a-button>
  </div>
</template>
<script>
export default {
  name: "CartInfo",
  data() {
    return {
      value: 3
    };
  },
  methods: {
    createOrder() {
      console.log("create item");
      if (this.$store.getters.isLoggedIn) {
        this.$store.dispatch("createOrder").then(() => {
          this.$router.push({ name: "History" });
        });
      } else {
        this.$store.commit("setOpenPopup", true);
      }
    }
  },
  computed: {
    getFullPrice() {
      return this.$store.getters.getTotalPrice;
    }
  }
};
</script>

<style lang="scss">
.cart-actions {
  margin-left: 8px;
}
.cart-actions__price {
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: bold;
}
</style>
