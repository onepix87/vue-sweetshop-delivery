<template>
  <div class="admin-main">
    <div class="admin-main__navigation">
      <Navigation />
    </div>
    <div class="main-container admin-main__container">
      <component :is="currentPage" />
    </div>
  </div>
</template>

<script>
import Navigation from "./AdminNavigation";
import Home from "./AdminHome";
import OrderList from "./AdminOrders";
import ProductList from "./AdminProduct/index";
import AddProduct from "./AdminAddProduct";

export default {
  name: "Admin",
  components: {
    Navigation,
    OrderList,
    ProductList,
    AddProduct,
    Home
  },
  created() {
    this.$store.dispatch("updateItemList");
  },
  computed: {
    currentPage() {
      return {
        AdminHome: "Home",
        AdminProductList: "ProductList",
        AdminOrderList: "OrderList",
        AdminAddProduct: "AddProduct"
      }[this.$route.name];
    }
  },
  methods: {
    remove(product) {
      console.log("remove", product);
      this.$store.dispatch("removeItem", product);
    }
  }
};
</script>

<style>
.admin-main {
  display: flex;
  flex-flow: row nowrap;
}

.admin-main__navigation {
  flex-shrink: 0;
}

.admin-main__container {
  flex-shrink: 1;
  flex-grow: 1;
}

.main-item-list {
  /*display: grid;*/
  /*grid-template-columns: repeat(5, 1fr);*/
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  margin: 16px 0;
}
</style>
