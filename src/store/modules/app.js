const app = {
  state: {
    test: ''
  },
  mutations: {
    UPDATE_TEST: (state, data) => {
      state.test = data;
    }
  },
  actions: {
    updateTest ({ commit }, data) {
      commit('UPDATE_TEST', data)
    }
  }
}

export default app;