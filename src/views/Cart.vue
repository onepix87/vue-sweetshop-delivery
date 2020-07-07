<template>
  <div class="cart main-container">
    <div class="cart-info">
      <CartItem
        v-for="item in cartList"
        :key="item.id"
        :item="item"
        class="cart-info__item"
      />
    </div>

    <div class="cart-actions">
      <CartInfo />
    </div>
  </div>
</template>

<script>
import CartItem from "../components/CartItem";
import CartInfo from "../components/CartInfo";
export default {
  name: "Cart",
  components: {
    CartItem,
    CartInfo
  },
  created() {
    // if (localStorage.cart) {
    //   this.$store.commit("setCartList", localStorage.cart);
    // }
  },
  computed: {
    cartList() {
      return this.$store.getters.getCartList;
    }
  }
};
</script>

<style lang="scss">
.cart {
  display: flex;
  flex-flow: row nowrap;
}
.cart-info {
  flex-grow: 3;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
}
.cart-actions {
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 660px) {
  .cart {
    flex-flow: column nowrap;
  }

  .cart-info {
    order: 1;
  }

  .cart-actions {
    margin-left: unset;
  }
}
</style>
