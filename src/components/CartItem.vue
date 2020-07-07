<template>
  <div v-if="item" class="cart-item">
    <div class="cart-item__image">
      <img :src="item.imageURL" />
    </div>

    <div id="itemName" class="cart-item__name">{{ item.name }}</div>

    <div id="itemPrice" class="cart-item__price">{{ item.price }} ₽</div>

    <div class="cart-item__count">
      <a-input-number
        id="itemCount"
        :value="item.count"
        :min="0"
        :max="100"
        @change="onChange($event)"
      />
    </div>

    <div class="mini-remove-btn">
      <a-button id="removeButton" @click="removeItem(item)" icon="delete" size="large" />
    </div>
  </div>
</template>
<script>
export default {
  name: "CartItem",
  props: {
    item: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      value: 3
    };
  },
  methods: {
    onChange(newValue) {
      this.$store.commit("setCartItemCount", {
        product: this.item,
        count: newValue
      });
    },
    removeItem(item) {
      this.$store.commit("removeCartItem", item);
    }
  }
};
</script>

<style lang="scss">
@import "@/styles";
.cart-item {
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 24px;
  justify-content: space-around;
  align-items: center;
  height: 108px;
  padding: 8px;
  border-bottom: 1px solid #ccc;
  border-radius: 4px;
}
.cart-item__image {
  height: 100%;
  img {
    height: 100%;
  }
}

.cart-item__price {
  font-weight: bold;
}

@media screen and (max-width: 660px) {
  /* .cart-item__count {
    display: none;
  } */

  .cart-item__image {
    display: none;
  }

  .cart-item {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .cart-item__name {
    grid-column: 1/4;
  }

  .mini-remove-btn {
    justify-self: flex-end;
  }
}
</style>
