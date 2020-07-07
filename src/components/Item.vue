<template>
  <div v-if="item" class="item">
    <div @click="$emit('click', item)" class="item__image">
      <img :src="item.imageURL" />
    </div>

    <div class="item__info" @click="$emit('click', item)">
      <a-tooltip placement="top">
        <template slot="title" v-if="item.name.length >= 20">
          <span>{{ item.name }}</span>
        </template>
        <div class="item__name">{{ name }}</div>
      </a-tooltip>
      <div class="item__price">{{ item.price }} ₽</div>
    </div>

    <a-button
      @click="$emit('addToCart', item)"
      type="primary"
      class="item__button"
    >
      {{ actionText }}
    </a-button>
  </div>
</template>

<script>
import { truncate } from 'lodash';

export default {
  name: "Item",
  props: {
    item: {
      type: Object,
      required: true
    },
    actionText: {
      type: String,
      default: "В корзину"
    }
  },
  methods: {},
  computed: {
    name() {
      return truncate(this.item.name, { length: 20 });
    }
  }
};
</script>

<style lang="scss">
@import "@/styles";
.item {
  margin-bottom: 24px;
  overflow: hidden;
  &:not(:last-child) {
    margin-right: 24px;
  }
}
.item__image {
  cursor: pointer;
  width: 250px;
  height: 250px;
  object-fit: cover;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.item__info {
  cursor: pointer;
}
.item__name {
  margin-top: 8px;
}

.item__price {
  font-weight: bold;
  font-size: 1.3rem;
}

</style>
