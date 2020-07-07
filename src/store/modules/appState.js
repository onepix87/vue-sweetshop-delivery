export default {
  state: {
    loading: false
  },
  getters: {
    isLoading(state) {
      return state.loading;
    }
  },
  mutations: {
    setLoading(state, value) {
      state.loading = value;
    }
  },
  actions: {}
};
