<template>
  <div class="main-container">
    <div v-if="product" class="product">
      <div class="product__image">
        <img :src="product.imageFullSizeURL" />
      </div>
      <div class="product__info">
        <div class="product__name">
          {{ product.name }}
        </div>

        <div class="product__price">{{ product.price }} ₽</div>

        <div class="product__description">
          {{ product.description }}
        </div>

        <a-button @click="addToCart" type="primary" class="product__button">
          Добавить в корзину
        </a-button>
      </div>
    </div>
    <div v-else>
      Loading
    </div>
  </div>
</template>

<script>
export default {
  name: "Product",
  created() {
    this.$store.dispatch("updateItem", this.$route.params.id);
  },
  computed: {
    product() {
      return this.$store.getters.getItem;
    }
  },
  methods: {
    addToCart() {
      this.$store.dispatch("addCartItem", this.product);
    }
  }
};
</script>

<style lang="scss">
.product {
  display: flex;
  flex-flow: row nowrap;
}
.product__image {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 50%;
  margin-right: 28px;

  img {
    width: 100%;
  }
}

.product__info {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 50%;
}

.product__name {
  font-size: 3rem;
}

.product__price {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 16px;
}

.product__button {
  margin-top: 24px;
}

@media screen and (max-width: 740px) {
  .product {
    flex-flow: column nowrap;
  }

  .product__image {
    margin-right: 0;
  }

  .product__button {
    margin-bottom: 24px;
  }
}
</style>
