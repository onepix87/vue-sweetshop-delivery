import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/firebase";
import moment from 'moment';

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

import "ant-design-vue/dist/antd.css";
import "./styles/index.scss";

import {
  Button,
  Input,
  InputNumber,
  FormModel,
  Form,
  Icon,
  Modal,
  Menu,
  Badge,
  Popconfirm,
  Spin,
  Tooltip,
  Dropdown
} from "ant-design-vue";
import firebase from "firebase";

Vue.prototype.$moment = moment;

Vue.use(Button);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(FormModel);
Vue.use(Form);
Vue.use(Icon);
Vue.use(Modal);
Vue.use(Menu);
Vue.use(Badge);
Vue.use(Popconfirm);
Vue.use(Spin);
Vue.use(Tooltip);
Vue.use(Dropdown)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// store.subscribe((mutation, state) => {
//   const types = [
//     "incrementCartItem",
//     "decrementCartItem",
//     "pushCartItem",
//     "removeCartItem"
//   ];
//   if (types.find(type => type === mutation.type)) {
//     console.log("save");
//     localStorage.cart = state.cartManager.cart;
//   }
// });
