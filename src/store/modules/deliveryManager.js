import firebase from "firebase";

export default {
  state: {
    currentOrdersList: null,
    isLoadingUpdatedDeliveryList: false,
    deliveryGuyOrders: null,
    isLoadingPersonalList: false,
  },
  getters: {
    getCurrentOrdersList(state) {
      return state.currentOrdersList;
    },
    getLoadingUpdatedDeliveryList(state) {
      return state.isLoadingUpdatedDeliveryList;
    },
    getDeliveryGuyOrders(state) {
      return state.deliveryGuyOrders;
    },
    getLoadingPersonalList(state) {
      return state.isLoadingPersonalList;
    }
  },
  mutations: {
    setCurrentOrdersList(state, value) {
      state.currentOrdersList = value;
    },
    setLoadingUpdatedDeliveryList(state, value) {
      state.isLoadingUpdatedDeliveryList = value;
    },
    setDeliveryGuyOrders(state, value) {
      state.deliveryGuyOrders = value;
    },
    setLoadingPersonalList(state, value) {
      state.isLoadingPersonalList = value
    }
  },
  actions: {
    updateCurrentOrdersList({ commit }) {
      return firebase
        .firestore()
        .collection("orders")
        .where("status", "==", "created")
        .get()
        .then(data => {
          const orders = [];
          data.forEach(doc => {
            orders.push({ id: doc.id, ...doc.data() });
          });
          // console.log(orders);
          commit("setCurrentOrdersList", orders);
        });
    },
    updateOrderStatus({ dispatch, commit, getters }, id) {
      // console.log("update order status", id);
      commit("setLoadingUpdatedDeliveryList", true);
       return firebase
        .firestore()
        .collection(`orders`)
        .doc(id)
        .update({
          status: "approved",
          deliveryGuyId: getters.getUser.id,
        })
        .then(() => {
          dispatch("updateCurrentOrdersList");
          commit("setLoadingUpdatedDeliveryList", false);
        });
    },
    updateDeliveryGuyOrders({ getters, commit }) {
      commit("setLoadingPersonalList", true);
      return firebase
        .firestore()
        .collection("orders")
        .where("deliveryGuyId", "==", getters.getUser.id)
        .get()
        .then(data => {
          const orders = [];
          data.forEach(doc => {
            orders.push({ id: doc.id, ...doc.data() });
          });
          // console.log(orders);
          orders.sort((a, b) => {
            if (a.status === 'approved') return -1;
            if (b.status === 'approved') return 1;
            return 0;
          })
          commit("setDeliveryGuyOrders", orders);
          commit("setLoadingPersonalList", false);
        });
    },
    finishOrder({ dispatch }, id) {
       return firebase
        .firestore()
        .collection("orders")
        .doc(id)
        .update({
          status: "done"
        })
        .then(() => {
          dispatch("updateDeliveryGuyOrders");
        });
    }
  }
};
