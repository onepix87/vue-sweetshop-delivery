<template>
  <div class="main-container">
    <div v-if="editedProduct" class="edit-product">
      <div class="product__image">
        <img :src="product.imageFullSizeURL" />
      </div>

      <div class="product__info">
        <div class="edit-product__field">
          <div class="edit-product__title">Название товара</div>
          <a-input
            v-model="editedProduct.name"
            type="text"
            autocomplete="off"
          />
        </div>

        <div class="edit-product__field">
          <div class="edit-product__title">Цена товара (₽)</div>
          <a-input
            v-model="editedProduct.price"
            type="number"
            autocomplete="off"
          />
        </div>

        <div class="edit-product__field">
          <div class="edit-product__title">Миниатюра изображение</div>
          <a-input
            v-model="editedProduct.imageURL"
            type="text"
            autocomplete="off"
          />
        </div>

        <div class="edit-product__field">
          <div class="edit-product__title">Изображение в полном размере</div>
          <a-input
            v-model="editedProduct.imageFullSizeURL"
            type="text"
            autocomplete="off"
          />
        </div>

        <div class="edit-product__field">
          <div class="edit-product__title">Описание товара</div>
          <a-textarea
            v-model="editedProduct.description"
            placeholder="Controlled autosize"
            :auto-size="{ minRows: 3, maxRows: 5 }"
          />
        </div>

        <a-button
          @click="$router.go(-1)"
          type="secondary"
          class="product__button"
          >Отмена
        </a-button>

        <a-button @click="saveProduct" type="primary" class="product__button">
          Сохранить
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
  name: "AdminProduct",
  created() {
    this.$store.dispatch("updateItem", this.$route.params.id).then(() => {
      this.editedProduct = this.product;
    });
  },
  computed: {
    product() {
      return this.$store.getters.getItem;
    }
  },
  methods: {
    saveProduct() {
      this.$store
        .dispatch("addItem", this.editedProduct)
        .then(() => this.$router.push({ name: "AdminProductList" }));
    }
  },
  data() {
    return {
      editedProduct: null
    };
  }
};
</script>

<style lang="scss">
.edit-product {
  display: flex;
  flex-flow: row nowrap;
}

.edit-product__title {
  font-size: 1rem;
  font-weight: bold;
  margin: 8px 0;
}

.edit-product__field {
  margin-bottom: 16px;
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

.product__button {
  margin-top: 24px;
  margin-right: 16px;
}
</style>
