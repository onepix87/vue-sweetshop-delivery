<template>
  <div class="main-container history">
    <h1>История заказов</h1>
    <div v-if="historyList && isLoggenIn" class="main-history-list">
      <div class="main-history-list__header">
        <div class="main-history-list__item">Дата заказа</div>
        <div class="main-history-list__item">Общая стоимость</div>
        <div class="main-history-list__item">Статус</div>
      </div>
      <HistoryItem
        v-for="item in historyList"
        :key="item.id"
        :item="item"
        @click="openItemPage(item)"
      />
    </div>
  </div>
</template>

<script>
import HistoryItem from "../components/HistoryItem";

export default {
  name: "History",
  components: {
    HistoryItem
  },
  created() {
    this.$store.dispatch("updateHistoryList");
  },
  computed: {
    historyList() {
      return this.$store.getters.getHistoryList;
    },
    isLoggenIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    // openItemPage({ id }) {
    //   console.log("router push", { id });
    //   this.$router.push({ name: "Product", params: { id: id } });
    // }
    // addToCart(product) {
    //   console.log(product);
    //   this.$store.dispatch("addCartItem", product);
    // }
  }
};
</script>

<style>
.main-history-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  margin: 16px 0;
}
.main-history-list__header {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-bottom: 10px;
}
.main-history-list__item {
  font-weight: bold;
  font-size: 21px;
}

@media screen and (max-width: 660px) {
  .main-history-list__header {
    display: none !important;
  }
}
</style>
