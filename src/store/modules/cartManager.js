import firebase from "firebase";

export default {
  state: {
    cart: []
  },
  getters: {
    getCartList(state) {
      return state.cart;
    },
    getCartItemCount(state) {
      if (state.cart.length === 0) return 0;
      return state.cart.reduce((sum, item) => {
        return sum + item.count;
      }, 0);
    },
    getTotalPrice(state) {
      if (state.cart.length === 0) return 0;
      return state.cart.reduce((sum, item) => {
        return sum + item.price * item.count;
      }, 0);
    }
  },
  mutations: {
    setCartList(state, cartList) {
      state.cart = cartList;
    },
    incrementCartItem(state, product) {
      let cartItem = state.cart.find(item => item.id === product.id);
      cartItem.count++;
    },
    setCartItemCount(state, { product, count }) {
      let cartItem = state.cart.find(item => item.id === product.id);
      cartItem.count = count;
    },
    decrementCartItem(state, product) {
      let cartItem = state.cart.find(item => item.id === product.id);
      cartItem.count--;
      if (cartItem.count === 0) {
        state.cart = state.cart.filter(item => item.id !== product.id);
      }
    },
    pushCartItem(state, product) {
      state.cart.push({ ...product, count: 1 });
    },
    removeCartItem(state, product) {
      state.cart = state.cart.filter(item => item.id !== product.id);
    },
    updateCartList(state) {
      localStorage.cart = state.cart;
    }
  },
  actions: {
    addCartItem({ commit, state }, product) {
      if (state.cart && state.cart.find(item => item.id === product.id)) {
        commit("incrementCartItem", product);
      } else {
        commit("pushCartItem", product);
      }
    },
    createOrder({ commit, getters }) {
      commit("setLoading", true);
      const newOrder = {
        createdAt: new Date(),
        userId: getters.getUser.id,
        status: "created",
        cart: getters.getCartList,
        price: getters.getTotalPrice,
        deliveryGuyId: null,
      };
      return firebase
        .firestore()
        .collection("orders")
        .add(newOrder)
        .then(r => {
          console.log("order created", r);
          commit("setLoading", false);
          commit("setCartList", []);
        });
    }
  }
};
