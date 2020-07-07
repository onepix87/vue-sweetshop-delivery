<template>
  <div id="app">
    <Header />
    <MainMenu v-if="false" />
    <div class="main">
      <router-view />
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainMenu from "@/components/MainMenu";
// import styles from "@/styles/index.scss";

export default {
  components: {
    Header,
    Footer,
    MainMenu
  }
};
</script>

<style lang="scss">
body {
  font-family: Tahoma, Arial, sans-serif;
  font-size: 16px;
  display: flex;
  flex-direction: column;
}
#app {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.main {
  flex-grow: 1;
}

.main-container {
  padding: 4px 28px;
}
</style>
