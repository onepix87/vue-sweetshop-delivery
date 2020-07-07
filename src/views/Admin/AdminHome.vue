<template>
  <div class="main-container">
    <h1>Главная страница</h1>
  </div>
</template>

<script>
export default {
  name: "AdminHome",
  created() {},
  computed: {},
  methods: {},
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
}
</style>
