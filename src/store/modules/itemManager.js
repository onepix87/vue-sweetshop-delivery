import firebase from "firebase";

export default {
  state: {
    itemList: null,
    item: null,
    search: ""
  },
  getters: {
    getItemList(state) {
      return state.itemList;
    },
    getItem(state) {
      return state.item;
    },
    getSearch(state) {
      return state.search;
    },
    getFilteredItemList(state) {
      return state.itemList.filter(item => {
        return (
          item.name.toLowerCase().indexOf(state.search.toLowerCase()) !== -1
        );
      });
    }
  },
  mutations: {
    setItemList(state, value) {
      state.itemList = value;
    },
    setItem(state, value) {
      state.item = value;
    },
    setSearch(state, value) {
      state.search = value;
    }
  },
  actions: {
    updateItemList({ commit }) {
      return firebase
        .firestore()
        .collection("items")
        .get()
        .then(data => {
          const itemList = [];
          data.forEach(doc => {
            itemList.push({ id: doc.id, ...doc.data() });
          });
          commit("setItemList", itemList);
        });
    },
    updateItem({ commit }, id) {
      console.log("update item", id);
      return firebase
        .firestore()
        .doc(`items/${id}`)
        .get()
        .then(data => {
          const item = { id: data.id, ...data.data() };
          console.log(item);
          commit("setItem", item);
        });
    },
    addItem({ dispatch, commit }, item) {
      commit("setLoading", true);
      return firebase
        .firestore()
        .collection(`items`)
        .doc(item.id)
        .set(item)
        .then(data => {
          dispatch("updateItemList", data);
          commit("setLoading", false);
        });
    },
    removeItem({ dispatch }, item) {
      console.log("remove item dispatch", item);

      dispatch("updateItem");
    }
  }
};
