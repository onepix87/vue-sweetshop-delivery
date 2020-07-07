<template>
  <div class="main-container">
    <div class="main-item-list">
      <Item
        v-for="item in itemList"
        :key="item.id"
        :item="item"
        @click="openItemPage(item)"
        @addToCart="addToCart(item)"
      />
    </div>
  </div>
</template>

<script>
import Item from "@/components/Item.vue";

export default {
  name: "Home",
  components: {
    Item
  },
  created() {
    this.$store.dispatch("updateItemList");
  },
  computed: {
    itemList() {
      if (this.$store.getters.getSearch.length) {
        return this.$store.getters.getFilteredItemList;
      } else {
        return this.$store.getters.getItemList;
      }
    }
  },
  methods: {
    openItemPage({ id }) {
      console.log("router push", { id });
      this.$router.push({ name: "Product", params: { id: id } });
    },
    addToCart(product) {
      console.log(product);
      this.$store.dispatch("addCartItem", product);
    }
  }
};
</script>

<style>
.main-item-list {
  /*display: grid;*/
  /*grid-template-columns: repeat(5, 1fr);*/
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin: 16px 0;
}
</style>
