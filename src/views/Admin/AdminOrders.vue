<template>
  <div class="main-container">
    <h1>Заказы</h1>
    <div v-if="orderList" class="orders-list">
      <div class="orders-list__header">
        <div class="orders-list__item">Дата заказа</div>
        <div class="orders-list__item">Общая стоимость</div>
        <div class="orders-list__item">Статус</div>
      </div>

      <div
        class="orders-list__order"
        v-for="order in orderList"
        :key="order.id"
      >
        <h4>Информация о заказе</h4>

        <div class="orders-list__info">
          <div class="orders-list__item">{{ parseDate(order.createdAt) }}</div>
          <div class="orders-list__item">{{ order.price }} ₽</div>
          <div class="orders-list__item">{{ parseStatus(order.status) }}</div>
        </div>

        <div class="orders-list__details">
          <h4>Состав заказа</h4>
          <div class="order-item__header">
            <div class="orders-list__item">Название</div>
            <div class="orders-list__item">Стоимость</div>
            <div class="orders-list__item">Количество</div>
          </div>
          <div class="order-item" v-for="item in order.cart" :key="item.id">
            <div class="orders-list__item">{{ item.name }}</div>
            <div class="orders-list__item">{{ item.price }}</div>
            <div class="orders-list__item">{{ item.count }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      Loading
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminOrders",
  created() {
    this.$store.dispatch("updateOrderList").then(() => {});
  },
  computed: {
    orderList() {
      return this.$store.getters.getOrderList;
    }
  },
  methods: {
    parseDate(timestamp) {
      const date = timestamp.toDate();
      const minutes = `${date.getMinutes()}`.padStart(2, "0");
      const hours = `${date.getHours()}`.padStart(2, "0");
      const day = `${date.getDate()}`.padStart(2, "0");
      const month = `${date.getMonth() + 1}`.padStart(2, "0");
      const year = date.getFullYear();
      return `${day}.${month}.${year} ${hours}:${minutes}`;
    },
    parseStatus(status) {
      return {
        created: "создан",
        approved: "подтвержден",
        cancelled: "отменен",
        done: "завершен"
      }[status];
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
.orders-list__header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  font-weight: bold;
  margin-bottom: 24px;
}

.orders-list__order {
  display: flex;
  flex-flow: column nowrap;
  padding: 8px 16px;
  background-color: #f0f0f0;
  border-radius: 4px;
  margin-bottom: 8px;
}

.orders-list__info {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}

.orders-list__details {
  padding: 16px 0;
}

.orders-list__item {
  min-width: 200px;
  max-width: 300px;
}

.order-item,
.order-item__header {
  display: flex;
  flex-flow: row nowrap;
}

.order-item__header {
  font-weight: bold;
}
</style>
