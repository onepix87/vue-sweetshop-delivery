<template>
  <a-popconfirm
    :title="item.status==='created' ? 'Вы уверены, что хотите принять этот заказ?' : 'Вы уже завершили заказ?'" 
    ok-text="Да"
    cancel-text="Нет"
    @confirm="$emit('confirm')"
    @cancel="$emit('cancel')"
    v-if="item.status === 'approved' || item.status === 'created'"
    >
    <HistoryItem 
      :item="item"
      isDelivery
    />
  </a-popconfirm>
  <HistoryItem 
   v-else
   :item="item"
   isDelivery
    />
</template>

<script>
import HistoryItem from "./HistoryItem";

export default {
  name: "CurrentOrderItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    HistoryItem
  }
};
</script>
