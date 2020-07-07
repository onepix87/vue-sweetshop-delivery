import firebase from "firebase";

export default {
  state: {
    orderList: null
  },
  getters: {
    getOrderList(state) {
      return state.orderList;
    }
  },
  mutations: {
    setOrderList(state, value) {
      state.orderList = value;
    }
  },
  actions: {
    updateOrderList({ commit }) {
      // const orderList = [
      //   {
      //     id: "1",
      //     itemList: ["1", "2", "3"],
      //     totalPrice: 100,
      //     date: new Date(),
      //     status: "Завершено",
      //     imageURL:
      //       "https://cdn1.ozone.ru/s3/multimedia-6/wc250/6007096938.jpg",
      //     imageFullSizeURL:
      //       "https://cdn1.ozone.ru/s3/multimedia-6/wc1200/6007096938.jpg"
      //   },
      //   {
      //     id: "2",
      //     itemList: ["1", "2", "3"],
      //     totalPrice: 100,
      //     date: new Date(),
      //     status: "Завершено",
      //     imageURL:
      //       "https://cdn1.ozone.ru/s3/multimedia-6/wc250/6007096938.jpg",
      //     imageFullSizeURL:
      //       "https://cdn1.ozone.ru/s3/multimedia-6/wc1200/6007096938.jpg"
      //   },
      //   {
      //     id: "3",
      //     itemList: ["1", "2", "3"],
      //     totalPrice: 100,
      //     date: new Date(),
      //     status: "Завершено",
      //     imageURL:
      //       "https://cdn1.ozone.ru/s3/multimedia-6/wc250/6007096938.jpg",
      //     imageFullSizeURL:
      //       "https://cdn1.ozone.ru/s3/multimedia-6/wc1200/6007096938.jpg"
      //   },
      //   {
      //     id: "4",
      //     itemList: ["1", "2", "3"],
      //     totalPrice: 100,
      //     date: new Date(),
      //     status: "Завершено",
      //     imageURL:
      //       "https://cdn1.ozone.ru/s3/multimedia-6/wc250/6007096938.jpg",
      //     imageFullSizeURL:
      //       "https://cdn1.ozone.ru/s3/multimedia-6/wc1200/6007096938.jpg"
      //   },
      //   {
      //     id: "5",
      //     itemList: ["1", "2", "3"],
      //     totalPrice: 100,
      //     date: new Date(),
      //     status: "Завершено",
      //     imageURL:
      //       "https://cdn1.ozone.ru/s3/multimedia-6/wc250/6007096938.jpg",
      //     imageFullSizeURL:
      //       "https://cdn1.ozone.ru/s3/multimedia-6/wc1200/6007096938.jpg"
      //   }
      // ];
      return firebase
        .firestore()
        .collection("orders")
        .get()
        .then(data => {
          const orders = [];
          data.forEach(doc => {
            orders.push({ id: doc.id, ...doc.data() });
          });
          console.log(orders);
          commit("setOrderList", orders);
        });
    }
  }
};
