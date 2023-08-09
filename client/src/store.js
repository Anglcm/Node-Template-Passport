import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      key: 'test',
    }),
  ],
  state() {
    return {
      isAuthenticated: false,
      userData: null,
    };
  },
  mutations: {
    setUserData(state, data) {
      state.isAuthenticated = true;
      state.userData = data;
    }
  },
  actions: {
    storeUserData({ commit }, payload) {
      commit('setUserData', payload);
    }
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    userData: state => state.userData
  },
});
