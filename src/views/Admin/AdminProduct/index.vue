<template>
  <div class="product-list__container">
    <div v-if="itemList" class="product-list__content">
      <Item
        v-for="item in itemList"
        :key="item.id"
        :item="item"
        actionText="Удалить"
        @click="openItemPage(item)"
        @addToCart="remove(item)"
      />
    </div>
    <div v-else>
      Loading
    </div>
  </div>
</template>

<script>
import Item from "@/components/Item.vue";

export default {
  name: "AdminProduct",
  components: {
    Item
  },
  created() {
    this.$store.dispatch("updateItemList");
  },
  computed: {
    itemList() {
      return this.$store.getters.getItemList;
    }
  },
  methods: {
    openItemPage({ id }) {
      console.log("router push", { id });
      this.$router.push({ name: "AdminEditProduct", params: { id: id } });
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
.product-list__content {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}
</style>
