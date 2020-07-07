<template>
  <div class="footer">
    <div class="footer__text">© 2020, ООО «Пти-Шу», официальный сайт</div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  methods: {},
  data: () => {
    return {};
  }
};
</script>

<style lang="scss">
@import "@/styles";
.footer {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $main-color;
}

.footer__text {
  text-align: center;
  color: white;
}
</style>
