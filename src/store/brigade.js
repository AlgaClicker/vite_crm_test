import { instance, api } from '@/modules/webclient.js'
import { isProxy, toRaw, ref } from 'vue';

const state = {
    mesagges: [],
    brigadeList: [],
    brigada: {
      id:'',
      name: '',
      maser: '',
      specifications: [],
      workpeople: []
    }

};
const getters = {
   getBrigadeList: state => state.brigadeList
};

const actions = {
  async loadActiveSpecificationList({commit}) {

  },
  async loadBrigadeList({commit},data=null) {
    commit('clearBrigadeList')
    var brigades = await api('crm/brigade', 'all' ,data);
    console.log("brigades",brigades)
    commit('setBrigadeList',brigades)
  }
};

const mutations = {
  setBrigadeList(state,brigade) {
    state.brigadeList = brigade
    //console.log( state.brigadeList)
  },
  clearBrigadeList(state){
    state.brigadeList = [];
  }

  
};

export default {
  state,
  getters,
  actions,
  mutations
};