import firebase from "firebase";

export default {
  state: {
    historyList: null
  },
  getters: {
    getHistoryList(state) {
      return state.historyList;
    }
  },
  mutations: {
    setHistoryList(state, value) {
      state.historyList = value;
    }
  },
  actions: {
    updateHistoryList({ commit, getters }) {
      return firebase
        .firestore()
        .collection("orders")
        .where("userId", "==", getters.getUser.id)
        .get()
        .then(data => {
          const orders = [];
          data.forEach(doc => {
            orders.push({ id: doc.id, ...doc.data() });
          });
          orders.sort((a, b) => {
            if (a.status === 'done') return 1;
            if (b.status === 'done') return -1;
            return 0;
          })
          console.log(orders);
          commit("setHistoryList", orders);
        });
    }
  }
};
