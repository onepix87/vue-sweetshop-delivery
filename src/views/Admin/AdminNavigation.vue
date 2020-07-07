<template>
  <div class="admin-navigation">
    <a-menu
      :selectedKeys="current"
      style="width: 256px"
      mode="inline"
      @click="handleClick"
    >
      <a-menu-item key="AdminHome"> <a-icon type="home" />Главная </a-menu-item>
      <a-menu-item key="AdminOrderList">
        <a-icon type="star" />Заказы
      </a-menu-item>
      <a-menu-item key="AdminProductList">
        <a-icon type="shopping" />Товары
      </a-menu-item>
      <a-menu-item key="AdminAddProduct">
        <a-icon type="plus" />Новый товар
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: "AdminNavigation",
  components: {},
  created() {
    this.$store.dispatch("updateItemList");
  },
  computed: {
    current() {
      return [this.$route.name];
    }
  },
  methods: {
    handleClick(click) {
      console.log(click);
      this.$router.push({ name: click.key });
    }
  },
  data: () => {
    return {};
  }
};
</script>

<style>
.main-item-list {
  /*display: grid;*/
  /*grid-template-columns: repeat(5, 1fr);*/
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  margin: 16px 0;
}
</style>
