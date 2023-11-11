import { instance } from '@/modules/webclient.js'
import { isProxy, toRaw, ref } from 'vue';

const state = {
  pagginate: {
    page: 1,
    limit: 5,
    pages: 1
  },

};
const getters = {
    getPagginate: (state) => state.pagginate,
    getPagginateLimit: (state) => state.pagginate.limit
    
};

const actions = {
    setPagginate({commit},paggiante) {
      commit('setPagginate',paggiante)
    },
    setPagginatePage({commit},page) {
      commit('setPagginatePage',page)
    },
    setPagginateLimit({commit},limit) {
      commit('setPagginateLimit',limit)
    }
};

const mutations = {
  setPagginate(state,paggiante) {
    console.log('mutations',paggiante),
    state.pagginate = paggiante
  },
  setPagginatePage(state,page) {
    state.pagginate.page = page
  },
  setPagginateLimit(state,limit) {
    console.log(limit)
    state.pagginate.limit = limit
  }

};

export default {
  state,
  getters,
  actions,
  mutations
};