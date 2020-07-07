<template>
  <div class="main-container history">
    <h1>Принятые вами заказы</h1>
    <div v-if="currentOrderList && isLoggenIn && !isLoading" class="main-history-list">
      <div class="main-history-list__header">
        <div class="main-history-list__item">Дата заказа</div>
        <div class="main-history-list__item">Статус</div>
      </div>
      <CurrentOrderItem
        v-for="item in currentOrderList"
        :key="item.id"
        :item="item"
        isDelivery
        @confirm="confirmHasDelivered(item)"
      />
    </div>
    <div v-else class="spinner_conteiner">
      <a-spin />
    </div>
  </div>
</template>

<script>
import CurrentOrderItem from "../components/CurrentOrderItem";

export default {
  name: "DeliveryGuyOrders",
  components: {
    CurrentOrderItem
  },  
  created() {
    setTimeout(() => this.$store.dispatch("updateDeliveryGuyOrders"), 3000);
  },
  computed: {
    currentOrderList() {
      return this.$store.getters.getDeliveryGuyOrders;
    },
    isLoggenIn() {
      return this.$store.getters.isLoggedIn;
    },
    isLoading() {
      return this.$store.getters.getLoadingPersonalList;
    }
  },
  methods: {
    confirmHasDelivered(item) {
      this.$store.dispatch("finishOrder", item.id);
    }
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
.spinner_conteiner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60vh;
}
</style>
