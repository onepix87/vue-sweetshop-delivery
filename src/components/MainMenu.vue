<template>
  <div class="main-menu main-container">
    <div
      v-for="(item, index) in MenuList"
      :key="index"
      @click="console.log('category', item.category)"
      class="main-menu__item"
      :class="{ 'main-menu__item--active': false }"
    >
      {{ item.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: "MainMenu",
  methods: {},
  computed: {
    MenuList() {
      return [
        { category: "food", text: "Еда" },
        { category: "clothes", text: "Одежда" },
        { category: "beauty", text: "Красота и здоровье" },
        { category: "book", text: "Книги" }
      ];
    }
  }
};
</script>

<style lang="scss">
@import "@/styles";
.main-menu {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
}

.main-menu__item {
  cursor: pointer;
  &:hover {
    color: $main-color;
  }
  &:not(:last-child) {
    margin-right: 16px;
  }
  &--active {
    text-decoration: underline;
  }
}
</style>
