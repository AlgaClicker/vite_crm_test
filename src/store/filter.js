import { instance } from '@/modules/webclient.js'
import { isProxy, toRaw, ref } from 'vue';

const state = {
    mesagges: [],
    filter: {}

};
const getters = {
  getFilterRequest: (state)=>state.filter
};

const actions = {
    addFilterReq({commit},key,val) {
      commit('addFilterReq',key,val)
    },
    removeFilterReq({commit},key){
      commit('removeFilterReq',key)
    },
    clearFilterReq({commit},key){
      commit('clearFilterReq')
    }
};

const mutations = {
  addFilterReq(state,filter) {
    
    state.filter = filter
    console.log("addFilterReq",state.filter)
  },
  removeFilterReq(state,key) {
    console.log("removeFilterReq",state.filter[key])
    state.filter[key] = null
    //state.filter = state.filter.filter(item => (item.id !== key));
  },
  clearFilterReq(state) {
    state.filter={}
  }

};

export default {
  state,
  getters,
  actions,
  mutations
};